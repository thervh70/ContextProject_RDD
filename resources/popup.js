$(document).ready(function () {
    var text = [
        "Octopeer has crashed!",
        "Octopeer is running.",
        "Octopeer is turned off.",
        "Octopeer is standby."
    ];

    var icon = [
        "icon_large_error.png",
        "icon_large_green.png",
        "icon_large.png",
        "icon_large_standby.png"
    ];

    function read_status() {
        chrome.storage.sync.get("status", function (res) {
            set_popup(res.status);
        });
    }

    function set_popup(status) {
        $("#status_text").html(text[status]);
        $("#status_image").attr("src", icon[status]);
    }

    document.addEventListener('DOMContentLoaded', read_status);

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.status !== undefined) {
            set_popup(message.status);
        }
        sendResponse({});
    })
});
