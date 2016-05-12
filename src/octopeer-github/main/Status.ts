/**
 * The Status class handles the correct storage of the status.
 * The status object is stored in the Chrome storage.
 * There are 4 flags: 0 (error), 1 (running), 2 (off) and 3 (standby).
 */

enum StatusCode {ERROR, RUNNING, OFF, STANDBY};

class Status {

    /**
     * Set the error status.
     */
    public error() {
        this.set(StatusCode.ERROR);
    }

    /**
     * Set the running status.
     */
    public running() {
        this.set(StatusCode.RUNNING);
    }

    /**
     * Set the off status.
     */
    public off() {
        this.set(StatusCode.OFF);
    }

    /**
     * Set the standby status.
     */
    public standby() {
        this.set(StatusCode.STANDBY);
    }

    /**
     * Set any status and inform the popup and the icon that they should be updated
     * @param status
     */
    public set(status: StatusCode) {
        const icon = [
            "icon_error.png",
            "icon_running.png",
            "icon_off.png",
            "icon_standby.png",
        ];

        const tiny = [
            "icon_tiny_error.png",
            "icon_tiny_running.png",
            "icon_tiny_off.png",
            "icon_tiny_standby.png",
        ]

        const text = [
            "Octopeer has crashed!",
            "Octopeer is running.",
            "Octopeer is turned off.",
            "Octopeer is standby.",
        ];

        chrome.storage.local.set({
            status: status,
        });

        chrome.runtime.sendMessage({line: text[status], path: icon[status]});
        chrome.browserAction.setIcon({path: tiny[status]}, function() {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            }
        });
    }
}
