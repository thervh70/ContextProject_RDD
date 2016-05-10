/**
 * Created by Mitchell on 10-5-2016.
 * Contains necessary functions for the Settings page of Octopeer.
 */

// Saves options to chrome.storage.
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
function restore_options() {
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

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);