$(document).ready(function () {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.line !== undefined) {
            $("#status_text").html(message.line);
            $("#status_image").attr("src", message.path);
        }
        sendResponse({});
    })
});
