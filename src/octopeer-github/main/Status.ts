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
            "icon_large_error.png",
            "icon_large_green.png",
            "icon_large.png",
            "icon_large_standby.png",
        ];

        chrome.storage.sync.set({
            status: status,
        });
        chrome.runtime.sendMessage({status: status});
        chrome.browserAction.setIcon({path: icon[status]}, function() {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            }
        });
    }
}
