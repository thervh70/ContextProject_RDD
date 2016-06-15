/**
 * Created by Mitchell on 10-5-2016.
 * Contains necessary functions for the Options page of Octopeer.
 */

// List that contains all optionID names that Octopeer provides.
var options = ['loggingEnabled', 'mouseHover',
    'mouseClick', 'mouseScrolling', 'mousePosition', 'dataComments',
    'dataKeystrokes', 'dataHTML', 'dataTabs',
    'dataResolution'];

// List that contains all subOptionID names that Octopeer provides.
var subOptions = ['mouseSubOptions', 'dataSubOptions'];

// List that contains all cardElement names that Octopeer provides.
var cards = ['mouse', 'data'];

// if one of these becomes disabled, disable and hide the others too.
var onDisableHideAndDisable = [
    ['dataComments', ['dataKeystrokes', 'dataHTML']],
    ['dataKeystrokes', ['dataHTML']]
];

// Object that contains all default options.
var defaultOptions = {};

// Listens for changes in the loggingEnabled flag.
// This boolean might be switched using the popup.
function changeListener() {
    chrome.storage.onChanged.addListener(function (changes, areaName) {
        if (areaName === "sync" && changes.loggingEnabled) {
            restoreOptionsState();
            restoreOptionsAvailability();
        }
    });
}

// Saves options to chrome.storage.
// A message will confirm this to the user.
function saveOptions() {
    var saveObject = {};
    // Loops over all options and adds the current value to the chrome storage.
    for (var i = 0; i < options.length; i++) {
        saveObject[options[i]] = optionsElement(i).prop('checked');
    }
    chrome.storage.sync.set(saveObject, function() {});
}

// Restores the states of the checkboxes, using the preferences stored in chrome.storage.
function restoreOptionsState() {
    chrome.storage.sync.get(options, function(items) {
        // Retrieves and restores the values by using the chrome.storage
        for (var i = 0; i < options.length; i++) {
            optionsElement(i).prop('checked', items[options[i]]);
        }
    });
}

// Restores the availability of the checkboxes, using the logging value which is stored in chrome.storage.
function restoreOptionsAvailability() {
    chrome.storage.sync.get({
        // Default value
        loggingEnabled: true
    }, function(items) {
        var enabled = items.loggingEnabled;
        if (enabled) {
            show();
        } else {
            hide();
        }

        for (var i = 0; i < onDisableHideAndDisable.length; i++) {
            dynamicalyHideOrShowSubelements(onDisableHideAndDisable[i]);
        }
    });
}

// Shows the sub-options.
function showSubOptions() {
    for (var i = 0; i < subOptions.length; i++) {
        subOptionsElement(i).show();
    }
}

// Hides the sub-options.
function hideSubOptions() {
    for (var i = 0; i < subOptions.length; i++) {
        subOptionsElement(i).hide();
    }
}

// Shows the option cards.
function showCards() {
    for (var i = 0; i < cards.length; i++) {
        cardElement(i).show();
    }
}

// Hides the option cards.
function hideCards() {
    for (var i = 0; i < cards.length; i++) {
        cardElement(i).hide();
    }
}

// Disables availability of options.
function showWithDisable() {
    // Starts at index 1, as the main option at index 0 doesn't need to be disabled (just all other options).
    for (var i = 1; i < options.length; i++) {
        optionsElement(i).removeAttr("disabled");
    }
}

// Enables availability of options.
function hideWithDisable() {
    // Starts at index 1, as the main option at index 0 doesn't need to be enabled (just all other options).
    for (var i = 1; i < options.length; i++) {
        optionsElement(i).attr("disabled", true);
    }
}

// Retrieves the element of an option.
function optionsElement(index){
    return elementGenerator(index, options);
}

// Retrieves the element of a subOption.
function subOptionsElement(index){
    return elementGenerator(index, subOptions);
}

// Retrieves the element of a card.
function cardElement(index){
    return elementGenerator(index, cards);
}

// Helper function that creates an element based on an index and an array containing the option names.
function elementGenerator(index, array){
    return $('#' + array[index]);
}

// Adds click events to the checkboxes of the options.
// When clicking on the main option, switchOptions is also called.
function addOptionClickEvents() {
    optionsElement(0).click(switchOptions);

    for (var i = 0; i < options.length; i++) {
        optionsElement(i).click(saveOptions);
    }

    for (var i = 0; i < onDisableHideAndDisable.length; i++) {
        (function (tohide) {
            $("#" + tohide[0]).click(function() {
                dynamicalyHideOrShowSubelements(tohide);
                saveOptions();
            });
        })(onDisableHideAndDisable[i]);
    }
}

function dynamicalyHideOrShowSubelements(tohide) {
    if ($("#" + tohide[0]).prop('checked')) {
        for (var s in tohide[1]) {
            $("#" + tohide[1][s]).prop('checked', true).removeAttr("disabled");
        }
    } else {
        for (var s in tohide[1]) {
            $("#" + tohide[1][s]).prop('checked', false).attr("disabled", true);
        }
    }
}

// Constants that define the function that will be called.
// Different show/hide (or disable switch) methods can be called from here.
// These different implementations are there for user testing.
const show = showWithDisable;
const hide = hideWithDisable;

// Disables the (sub)options when the user doesn't want Octopeer to log data and
// enables the (sub)options when the user does.
// A message will confirm this action to the user.
function switchOptions() {
    var logging = optionsElement(0).prop('checked');
    if (logging) {
        show();
    } else {
        hide();
    }
}

// Saves the default options by saving an object.
function saveDefaults() {
    for (var i = 0; i < options.length; i++) {
        defaultOptions[options[i]] = optionsElement(i).prop('checked');
    }
}

// Sets the options to the default options by updating the chrome storage and the options page.
function restoreDefaults() {
    chrome.storage.sync.set(defaultOptions, function() {});
    restoreOptionsState();
    restoreOptionsAvailability();
}

document.addEventListener('DOMContentLoaded', restoreOptionsState);
document.addEventListener('DOMContentLoaded', restoreOptionsAvailability);

// Will execute once the page DOM is ready.
$(document).ready(function() {
    saveDefaults();
    addOptionClickEvents();
    changeListener();
    $('#restore').click(restoreDefaults);
});
