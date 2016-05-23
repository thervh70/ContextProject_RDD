$(document).ready(function () {
    //Get from storage on start.
    chrome.storage.local.get(["line", "path"], function(items) {
        $("#status_text").html(items.line);
        $("#status_image").attr("src", items.path);
    });

    //Reset status on change.
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.line !== undefined) {
            $("#status_text").html(message.line);
            $("#status_image").attr("src", message.path);
        }
        sendResponse({});
    });

    //Use the toggle button on the popup to switch the loggingEnabled option.
    function toggle() {
        chrome.storage.sync.get("loggingEnabled", function (res) {
            chrome.storage.sync.set({
                loggingEnabled: !(res.loggingEnabled)
            })
        });
    }

    $('#status_toggle').click(toggle);
});
