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
        chrome.storage.sync.set({
            status: StatusCode.ERROR,
        });
    }

    /**
     * Set the running status.
     */
    public running() {
        chrome.storage.sync.set({
            status: StatusCode.RUNNING,
        });
    }

    /**
     * Set the off status.
     */
    public off() {
        chrome.storage.sync.set({
            status: StatusCode.OFF,
        });
    }

    /**
     * Set the standby status.
     */
    public standby() {
        chrome.storage.sync.set({
            status: StatusCode.STANDBY,
        });
    }
}
