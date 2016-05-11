$(document).ready( function () {
    var text = [
        "Octopeer has chrashed!",
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

    function toggle_status() {
        chrome.storage.sync.get("status", function (res) {
            var count = (res.status + 1) % text.length;
            set_popup(text[count],icon[count]);
            set_storage(count);
        });
    }
    
    function read_status() {
        chrome.storage.sync.get("status", function (res) {
            set_popup(text[res.status],icon[res.status])
        });
    }
    
    function set_storage(int) {
        chrome.storage.sync.set({
            status: int
        });
    }
    
    function set_popup(string, icon_string) {
        $('#status_text').html(string);
        $('#status_image').attr("src", icon_string);
    }
    
    document.addEventListener('DOMContentLoaded', read_status());
    document.getElementById('status_toggle').addEventListener('click',toggle_status);
});