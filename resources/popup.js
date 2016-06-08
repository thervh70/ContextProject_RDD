// Use the toggle button on the popup to switch the loggingEnabled option.
function toggle() {
    chrome.storage.sync.get("loggingEnabled", function (res) {
        chrome.storage.sync.set({
            loggingEnabled: !(res.loggingEnabled)
        })
    });
}

$(document).ready(function () {
    // Get from storage on start.
    chrome.storage.local.get(["line", "path"], function(items) {
        $("#statusText").html(items.line);
        $("#statusImage").attr("src", items.path);
    });

    // Reset status on change.
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.line !== undefined) {
            $("#statusText").html(message.line);
            $("#statusImage").attr("src", message.path);
        }
        sendResponse({});
    });

    $('#statusToggle').click(toggle);
});
