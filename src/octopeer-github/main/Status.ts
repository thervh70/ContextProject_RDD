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
            "img/icon/icon_error.png",
            "img/icon/icon_running.png",
            "img/icon/icon_off.png",
            "img/icon/icon_standby.png",
        ];

        const tiny = [
            "img/icon/icon_error19.png",
            "img/icon/icon_running19.png",
            "img/icon/icon_off19.png",
            "img/icon/icon_standby19.png",
        ];

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
