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
    ['dataKeystrokes', ['dataHTML']],
    ['mousePosition', ['mouseHover', 'mouseClick']],
    ['mouseHover', ['mouseClick']]
];

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
            restoreSubOptionsAvailability();
        } else {
            hide();
        }
    });
}

// Restores the availability of the checkboxes, that are enabled / disabled by other checkboxes. using the logging value which is stored in chrome.storage.
function restoreSubOptionsAvailability() {
    for (var i = 0; i < onDisableHideAndDisable.length; i++) {
        dynamicalyHideOrShowSubOptions(onDisableHideAndDisable[i]);
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
                dynamicalyHideOrShowSubOptions(tohide);
                saveOptions();
            });
        })(onDisableHideAndDisable[i]);
    }
}

function dynamicalyHideOrShowSubOptions(tohide) {
    if ($("#" + tohide[0]).prop('checked') && !$("#" + tohide[0]).attr('disabled') ) {
        for (var element in tohide[1]) {
            if ($("#" + tohide[1][element]).attr("disabled")) {
                $("#" + tohide[1][element]).removeAttr("disabled");
            }
        }
    } else {
        for (var element in tohide[1]) {
            $("#" + tohide[1][element]).attr("disabled", true);
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

// Sets the options to the default options by updating the chrome storage and the options page.
// Because callbacks are used, these two chrome functions calls can't be separated.
function restoreDefaults() {
    chrome.storage.local.get(options, function(items) {
        var obj = {};
        for (var i = 0; i < options.length; i++) {
            obj[options[i]] = items[options[i]];
        }
        chrome.storage.sync.set(obj);
        restoreOptionsState();
        restoreOptionsAvailability();
    });
}

document.addEventListener('DOMContentLoaded', restoreOptionsState);
document.addEventListener('DOMContentLoaded', restoreOptionsAvailability);

// Will execute once the page DOM is ready.
$(document).ready(function() {
    addOptionClickEvents();
    changeListener();
    $('#restore').click(restoreDefaults);
});
