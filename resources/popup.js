$(document).ready(function () {
    function read_status() {
        chrome.storage.local.get("status", function (res) {
            set_popup(res.status);
        });
    }

    function set_popup(text, path) {
        $("#status_text").html(text);
        $("#status_image").attr("src", path);
    }

    document.addEventListener('DOMContentLoaded', read_status);

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.line !== undefined) {
            set_popup(message.line, message.path);
        }
        sendResponse({});
    })
});
