/**
 * Created by Mitchell on 10-5-2016.
 * Contains necessary functions for the Settings page of Octopeer.
 */

// Helper function; simplifies the calls to specific document e-L-ements.
function l(id) {
    return document.getElementById(id)
}

// Saves options to chrome.storage.
// A message will confirm this to the user.
function save_options() {
    var logging = l('logging').checked;
    var tabs = l('tabs').checked;
    var comments = l('comments').checked;
    var peer_comments = l('peer_comments').checked;
    var focus = l('focus').checked;
    var username = l('username').checked;
    var repo = l('repo').checked;
    var file = l('file').checked;
    chrome.storage.sync.set({
        // General
        loggingEnabled: logging,
        // Privacy
        trackTabs: tabs,
        trackComments: comments,
        trackPeerComments: peer_comments,
        trackFocus: focus,
        // Security
        hashUsername: username,
        hashRepo: repo,
        hashFile: file
        // Hints
    }, function() {
        Materialize.toast("Settings saved!", 2000);
    });
}

// Restores the states of the checkboxes, using the preferences stored in chrome.storage.
function restore_options_state() {
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
        l('logging').checked = items.loggingEnabled;
        l('tabs').checked = items.trackTabs;
        l('comments').checked = items.trackComments;
        l('peer_comments').checked = items.trackPeerComments;
        l('focus').checked = items.trackFocus;
        l('username').checked = items.hashUsername;
        l('repo').checked = items.hashRepo;
        l('file').checked = items.hashFile;
    });
}

// Restores the availability of the checkboxes, using the logging value which is stored in chrome.storage.
function restore_options_availability() {
    chrome.storage.sync.get({
        // Default value
        loggingEnabled: true
    }, function(items) {
        // The availability depends on the value of the logging checkbox state.
        l('tabs').disabled = l('comments').disabled =
            l('peer_comments').disabled = l('focus').disabled =
                l('username').disabled = l('repo').disabled =
                    l('file').disabled = !items.loggingEnabled;
    });
}

// Disables the (sub)options when the user doesn't want Octopeer to log data and
// enables the (sub)options when the user does.
// A message will confirm this action to the user.
function switch_options() {
    var logging = l('logging').checked;
    if (logging) {
        Materialize.toast("Logging has been enabled.", 2000);
    } else {
        Materialize.toast("Logging has been disabled.", 2000);
    }
    l('tabs').disabled = !l('tabs').disabled;
    l('comments').disabled = !l('comments').disabled;
    l('peer_comments').disabled = !l('peer_comments').disabled;
    l('focus').disabled = !l('focus').disabled;
    l('username').disabled = !l('username').disabled;
    l('repo').disabled = !l('repo').disabled;
    l('file').disabled = !l('file').disabled;
}

document.addEventListener('DOMContentLoaded', restore_options_state);
document.addEventListener('DOMContentLoaded', restore_options_availability);

// Will execute once the page DOM is ready.
$(document).ready(function() {
    l('save').addEventListener('click', save_options);
    l('logging').addEventListener('click', switch_options);
});
