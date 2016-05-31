/**
 * Created by Mitchell on 10-5-2016.
 * Contains necessary functions for the Options page of Octopeer.
 */

// List that contains all optionID names that Octopeer provides.
var options = ['logging', 'tabs', 'comments', 'peerComments', 'focus', 'username', 'repo', 'file'];

// List that contains all subOptionID names that Octopeer provides.
var subOptions = ['securitySub', 'privacySub', 'hintsSub'];

// List that contains all cardID names that Octopeer provides.
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
        loggingEnabled: $(optionsID(0)).prop('checked'),
        // Privacy
        trackTabs: $(optionsID(1)).prop('checked'),
        trackComments:  $(optionsID(2)).prop('checked'),
        trackPeerComments: $(optionsID(3)).prop('checked'),
        trackFocus: $(optionsID(4)).prop('checked'),
        // Security
        hashUsername: $(optionsID(5)).prop('checked'),
        hashRepo: $(optionsID(6)).prop('checked'),
        hashFile: $(optionsID(7)).prop('checked')
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
        $(optionsID(0)).prop('checked', items.loggingEnabled);
        $(optionsID(1)).prop('checked', items.trackTabs);
        $(optionsID(2)).prop('checked', items.trackComments);
        $(optionsID(3)).prop('checked', items.trackPeerComments);
        $(optionsID(4)).prop('checked', items.trackFocus);
        $(optionsID(5)).prop('checked', items.hashUsername);
        $(optionsID(6)).prop('checked', items.hashRepo);
        $(optionsID(7)).prop('checked', items.hashFile);
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
        $(subOptionsID(i)).show();
    }
}

// Hides the sub-options.
function hideSubOptions() {
    for(var i = 0; i < subOptions.length; i++) {
        $(subOptionsID(i)).hide();
    }
}

// Shows the option cards.
function showCards() {
    for(var i = 0; i < cards.length; i++) {
        $(cardID(i)).show();
    }
}

// Hides the option cards.
function hideCards() {
    for(var i = 0; i < cards.length; i++) {
        $(cardID(i)).hide();
    }
}

// Switches availability of options.
function switchDisable() {
    for(var i = 1; i < options.length; i++) {
        $(optionsID(i)).disabled = !$(optionsID(i)).disabled;
    }
}

// Restores availability of options.
// The availability depends on the value of the logging checkbox state.
function restoreDisable() {
    var enabled = !items.loggingEnabled;
    for(var i = 1; i < options.length; i++) {
        $(optionsID(i)).disabled = enabled;
    }
}

// Retrieves the ID of an option.
function optionsID(index){
    return idGenerator(index, options);
}

// Retrieves the ID of a subOption.
function subOptionsID(index){
    return idGenerator(index, subOptions);
}

// Retrieves the ID of a card.
function cardID(index){
    return idGenerator(index, cards);
}

// Helper function that appends a hashtag to an element from an array, in order to return an ID.
function idGenerator(index, array){
    return '#' + array[index];
}

// Adds click events to the checkboxes of the options.
// When clicking on the main option, switchOptions is also called.
function addOptionClickEvents() {
    $(optionsID(0)).click(switchOptions);
    for(var i = 0; i < options.length; i++) {
        $(optionsID(i)).click(saveOptions);
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
    var logging = $(optionsID(0)).prop('checked');
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
