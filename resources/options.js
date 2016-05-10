/**
 * Created by Mitchell on 10-5-2016.
 * Contains necessary functions for the Settings page of Octopeer.
 */

// Saves options to chrome.storage.
// A message will confirm this to the user.
function save_options() {
    var logging = document.getElementById('logging').checked;
    var tabs = document.getElementById('tabs').checked;
    var comments = document.getElementById('comments').checked;
    var peer_comments = document.getElementById('peer_comments').checked;
    var focus = document.getElementById('focus').checked;
    var username = document.getElementById('username').checked;
    var repo = document.getElementById('repo').checked;
    var file = document.getElementById('file').checked;
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
        Materialize.toast("Settings saved!",2000);
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
        document.getElementById('logging').checked = items.loggingEnabled;
        document.getElementById('tabs').checked = items.trackTabs;
        document.getElementById('comments').checked = items.trackComments;
        document.getElementById('peer_comments').checked = items.trackPeerComments;
        document.getElementById('focus').checked = items.trackFocus;
        document.getElementById('username').checked = items.hashUsername;
        document.getElementById('repo').checked = items.hashRepo;
        document.getElementById('file').checked = items.hashFile;
    });
}

// Restores the availability of the checkboxes, using the logging value which is stored in chrome.storage.
function restore_options_availability() {
    chrome.storage.sync.get({
        // Default value
        loggingEnabled: true
    }, function(items) {
        // The availability depends on the value of the logging checkbox state.
        document.getElementById('tabs').disabled = document.getElementById('comments').disabled =
            document.getElementById('peer_comments').disabled = document.getElementById('focus').disabled =
                document.getElementById('username').disabled = document.getElementById('repo').disabled =
                    document.getElementById('file').disabled = !items.loggingEnabled;
    });
}

// Disables the (sub)options when the user doesn't want Octopeer to log data and
// enables the (sub)options when the user does.
// A message will confirm this action to the user.
function switch_options() {
    var logging = document.getElementById('logging').checked;
    if (logging) {
        Materialize.toast("Logging has been enabled.",2000);
    } else {
        Materialize.toast("Logging has been disabled.", 2000);
    }
    document.getElementById('tabs').disabled = !document.getElementById('tabs').disabled;
    document.getElementById('comments').disabled = !document.getElementById('comments').disabled;
    document.getElementById('peer_comments').disabled = !document.getElementById('peer_comments').disabled;
    document.getElementById('focus').disabled = !document.getElementById('focus').disabled;
    document.getElementById('username').disabled = !document.getElementById('username').disabled;
    document.getElementById('repo').disabled = !document.getElementById('repo').disabled;
    document.getElementById('file').disabled = !document.getElementById('file').disabled;
}

document.addEventListener('DOMContentLoaded', restore_options_state);
document.addEventListener('DOMContentLoaded', restore_options_availability);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('logging').addEventListener('click', switch_options);
