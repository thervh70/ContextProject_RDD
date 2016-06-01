/**
 * Created by Mitchell on 10-5-2016.
 * Contains necessary functions for the Options page of Octopeer.
 */

// List that contains all optionID names that Octopeer provides.
var options = ['loggingEnabled', 'trackTabs', 'trackComments', 'trackPeerComments', 'trackFocus', 'hashUsername', 'hashRepo', 'hashFile'];

// List that contains all subOptionID names that Octopeer provides.
var subOptions = ['securitySubOptions', 'privacySubOptions', 'hintsSubOptions'];

// List that contains all cardElement names that Octopeer provides.
var cards = ['security', 'privacy', 'hints'];

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
    chrome.storage.sync.set({
        // General
        loggingEnabled: optionsElement(0).prop('checked'),
        // Privacy
        trackTabs: optionsElement(1).prop('checked'),
        trackComments:  optionsElement(2).prop('checked'),
        trackPeerComments: optionsElement(3).prop('checked'),
        trackFocus: optionsElement(4).prop('checked'),
        // Security
        hashUsername: optionsElement(5).prop('checked'),
        hashRepo: optionsElement(6).prop('checked'),
        hashFile: optionsElement(7).prop('checked')
        // Hints
    }, function() {});
}

// Restores the states of the checkboxes, using the preferences stored in chrome.storage.
function restoreOptionsState() {
    chrome.storage.sync.get({
        loggingEnabled: Boolean,
        trackTabs: Boolean,
        trackComments: Boolean,
        trackPeerComments: Boolean,
        trackFocus: Boolean,
        hashUsername: Boolean,
        hashRepo: Boolean,
        hashFile: Boolean
    }, function(items) {
        // Saved values from the chrome.storage
        optionsElement(0).prop('checked', items.loggingEnabled);
        optionsElement(1).prop('checked', items.trackTabs);
        optionsElement(2).prop('checked', items.trackComments);
        optionsElement(3).prop('checked', items.trackPeerComments);
        optionsElement(4).prop('checked', items.trackFocus);
        optionsElement(5).prop('checked', items.hashUsername);
        optionsElement(6).prop('checked', items.hashRepo);
        optionsElement(7).prop('checked', items.hashFile);
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
    });
}

// Shows the sub-options.
function showSubOptions() {
    for(var i = 0; i < subOptions.length; i++) {
        subOptionsElement(i).show();
    }
}

// Hides the sub-options.
function hideSubOptions() {
    for(var i = 0; i < subOptions.length; i++) {
        subOptionsElement(i).hide();
    }
}

// Shows the option cards.
function showCards() {
    for(var i = 0; i < cards.length; i++) {
        cardElement(i).show();
    }
}

// Hides the option cards.
function hideCards() {
    for(var i = 0; i < cards.length; i++) {
        cardElement(i).hide();
    }
}

// Switches availability of options.
function switchDisable() {
    for(var i = 1; i < options.length; i++) {
        optionsElement(i).disabled = !optionsElement(i).disabled;
    }
}

// Restores availability of options.
// The availability depends on the value of the logging checkbox state.
function restoreDisable() {
    var enabled = !items.loggingEnabled;
    for(var i = 1; i < options.length; i++) {
        optionsElement(i).disabled = enabled;
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
    for(var i = 0; i < options.length; i++) {
        optionsElement(i).click(saveOptions);
    }
}

// Constants that define the function that will be called.
// Different show/hide (or disable switch) methods can be called from here.
// These different implementations are there for user testing.
const show = showCards;
const hide = hideCards;

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

document.addEventListener('DOMContentLoaded', restoreOptionsState);
document.addEventListener('DOMContentLoaded', restoreOptionsAvailability);

// Will execute once the page DOM is ready.
$(document).ready(function() {
    addOptionClickEvents();
    changeListener();
});
