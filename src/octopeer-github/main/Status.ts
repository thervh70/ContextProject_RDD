/**
 * The Status class handles the correct storage of the status.
 * The status object is stored in the Chrome storage.
 * There are 3 flags: 0 (error), 1 (running), 2 (off) and 3 (standby).
 */
class Status {

    /**
     * Set the error status.
     */
    public error() {
        chrome.storage.sync.set({
            status: 0,
        });
    }

    /**
     * Set the running status.
     */
    public running() {
        chrome.storage.sync.set({
            status: 1,
        });
    }

    /**
     * Set the off status.
     */
    public off() {
        chrome.storage.sync.set({
            status: 2,
        });
    }

    /**
     * Set the standby status.
     */
    public standby() {
        chrome.storage.sync.set({
            status: 3,
        });
    }
}
