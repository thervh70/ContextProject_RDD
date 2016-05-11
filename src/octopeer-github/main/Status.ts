/**
 * The Status class handles the correct storage of the status.
 * The status object is stored in the Chrome storage.
 * There are 3 flags: 0 (off), 1 (running) and -1 (error).
 */
class Status {

    /**
     * Set the running status.
     */
    public running() {
        chrome.storage.sync.set({
            status: 1,
        });
    }

    /**
     * Set the error status.
     */
    public error() {
        chrome.storage.sync.set({
            status: -1,
        });
    }

    /**
     * Set the off status.
     */
    public off() {
        chrome.storage.sync.set({
            status: 0,
        });
    }
}
