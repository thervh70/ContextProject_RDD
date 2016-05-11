$(document).ready( function () {
    var off = "Octopeer is turned off.";
    var running = "Octopeer is running.";
    var error = "Octopeer has chrashed!";
    var standby = "Octopeer is standby.";
    
    var icon_running = "icon_large_green.png";
    var icon_error = "icon_large_error.png";
    var icon_off = "icon_large.png";
    var icon_standby = "icon_large_standby.png";
    
    function switch_icon() {
        chrome.storage.sync.get("status", function (res) {
            switch (res.status) {
                case 0:
                    set_popup(running,icon_running);
                    set_storage(1);
                    break;
                case 1:
                    set_popup(error,icon_error);
                    set_storage(-1);
                    break;
                case -1:
                    set_popup(standby,icon_standby);
                    set_storage(2);
                    break;
                case 2:
                    set_popup(off,icon_off);
                    set_storage(0);
                    break;
            }
    
        });
    }
    
    function read_icon() {
        chrome.storage.sync.get("status", function (res) {
            switch (res.status) {
                case 0:
                    set_popup(off,icon_off);
                    break;
                case 1:
                    set_popup(running,icon_running);
                    break;
                case -1:
                    set_popup(error,icon_error);
                    break;
                case 2:
                    set_popup(standby,icon_standby);
                    break;
            }
    
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
    
    document.addEventListener('DOMContentLoaded', read_icon());
    document.getElementById('status_toggle').addEventListener('click',switch_icon);
});