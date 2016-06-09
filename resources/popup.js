// Use the toggle button on the popup to switch the loggingEnabled option.
function toggle() {
    chrome.storage.sync.get({ loggingEnabled: true }, toggleSetter);
}

// Helper function that sets loggingEnabled to the right new value.
function toggleSetter(settingsObject) {
    chrome.storage.sync.set({
        loggingEnabled: !(settingsObject.loggingEnabled)
    })
}

// Gets data from the storage on start.
function getStatusInfo() {
    chrome.storage.local.get(["line", "path"], function(items) {
        $("#statusText").html(items.line);
        $("#statusImage").attr("src", items.path);
    });
}

// Resets the status on change.
function addStatusListener() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.line !== undefined) {
            $("#statusText").html(message.line);
            $("#statusImage").attr("src", message.path);
        }
        sendResponse({});
    });
}

$(document).ready(function () {
    getStatusInfo();
    addStatusListener();
    $('#statusToggle').click(toggle);
});
