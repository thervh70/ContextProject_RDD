/**
 * Created by Mitchell on 10-5-2016.
 * Contains necessary functions for the Options page of Octopeer.
 */

// Saves options to chrome.storage.
// A message will confirm this to the user.
function saveOptions() {
    var logging = $('#logging').prop('checked');
    var tabs = $('#tabs').prop('checked');
    var comments = $('#comments').prop('checked');
    var peerComments = $('#peerComments').prop('checked');
    var focus = $('#focus').prop('checked');
    var username = $('#username').prop('checked');
    var repo = $('#repo').prop('checked');
    var file = $('#file').prop('checked');
    chrome.storage.sync.set({
        // General
        loggingEnabled: logging,
        // Privacy
        trackTabs: tabs,
        trackComments: comments,
        trackPeerComments: peerComments,
        trackFocus: focus,
        // Security
        hashUsername: username,
        hashRepo: repo,
        hashFile: file
        // Hints
    }, function() {
        Materialize.toast("Options saved!", 2000);
    });
}

// Restores the states of the checkboxes, using the preferences stored in chrome.storage.
function restoreOptionsState() {
    chrome.storage.sync.get({
        // Default values
        loggingEnabled: true,
        trackTabs: true,
        trackComments: true,
        trackPeerComments: true,
        trackFocus: true,
        hashUsername: true,
        hashRepo: true,
        hashFile: false
    }, function(items) {
        // Saved values from the chrome.storage
        $('#logging').prop('checked', items.loggingEnabled);
        $('#tabs').prop('checked', items.trackTabs);
        $('#comments').prop('checked', items.trackComments);
        $('#peerComments').prop('checked', items.trackPeerComments);
        $('#focus').prop('checked', items.trackFocus);
        $('#username').prop('checked', items.hashUsername);
        $('#repo').prop('checked', items.hashRepo);
        $('#file').prop('checked', items.hashFile);
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
    $('#security_sub').show();
    $('#privacy_sub').show();
    $('#hints_sub').show();
}

// Hides the sub-options.
function hideSubOptions() {
    $('#security_sub').hide();
    $('#privacy_sub').hide();
    $('#hints_sub').hide();
}

// Shows the option cards.
function showCards() {
    $('#security').show();
    $('#privacy').show();
    $('#hints').show();
}

// Hides the option cards.
function hideCards() {
    $('#security').hide();
    $('#privacy').hide();
    $('#hints').hide();
}

// Switches availability of options.
function switchDisable() {
    $('#tabs').disabled = !$('#tabs').disabled;
    $('#comments').disabled = !$('#comments').disabled;
    $('#peerComments').disabled = !$('#peerComments').disabled;
    $('#focus').disabled = !$('#focus').disabled;
    $('#username').disabled = !$('#username').disabled;
    $('#repo').disabled = !$('#repo').disabled;
    $('#file').disabled = !$('#file').disabled;
}

// Restores availability of options.
// The availability depends on the value of the logging checkbox state.
function restoreDisable() {
    $('#tabs').disabled = $('#comments').disabled =
        $('#peerComments').disabled = $('#focus').disabled =
            $('#username').disabled = $('#repo').disabled =
                $('#file').disabled = !items.loggingEnabled;
}

// Constants that define the function that will be called.
const show = showCards;
const hide = hideCards;

// Disables the (sub)options when the user doesn't want Octopeer to log data and
// enables the (sub)options when the user does.
// A message will confirm this action to the user.
function switchOptions() {
    var logging = $('#logging').prop('checked');
    if (logging) {
        Materialize.toast("Logging has been enabled.", 2000);
        show();
    } else {
        Materialize.toast("Logging has been disabled.", 2000);
        hide();
    }
}

document.addEventListener('DOMContentLoaded', restoreOptionsState);
document.addEventListener('DOMContentLoaded', restoreOptionsAvailability);

// Will execute once the page DOM is ready.
$(document).ready(function() {
    $('#save').click(saveOptions);
    $('#logging').click(switchOptions);
});
