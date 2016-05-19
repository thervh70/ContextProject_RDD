/**
 * The Status class handles the correct storage of the status.
 * The status object is stored in the Chrome storage.
 * There are 4 flags: 0 (error), 1 (running), 2 (off) and 3 (standby).
 */

enum StatusCode {ERROR, RUNNING, OFF, STANDBY}

namespace Status {

    /**
     * Status.NAME: the internal names of the enum StatusCode.
     */
    let NAME = [
        "error",
        "running",
        "off",
        "standby",
    ];

    /**
     * Status.MESSAGE: the message strings of the enum StatusCode.
     */
    let MESSAGE = [
        "Octopeer has crashed!",
        "Octopeer is running.",
        "Octopeer is turned off.",
        "Octopeer is standby.",
     ];

    /**
     * Set the error status.
     */
    export function error() {
        this.set(StatusCode.ERROR);
    }

    /**
     * Set the running status.
     */
    export function running() {
        this.set(StatusCode.RUNNING);
    }

    /**
     * Set the off status.
     */
    export function off() {
        this.set(StatusCode.OFF);
    }

    /**
     * Set the standby status.
     */
    export function standby() {
        this.set(StatusCode.STANDBY);
    }

    /**
     * Gets the correct status icon based on StatusCode and size.
     * Chrome resizes all icons except for the one in the toolbar.
     * That is why we added an extra case.
     * @param status        the StatusCode to get the icon for.
     * @param size          the size of the icon file (if it does not exist, it returns the largest icon).
     * @returns {string}    the relative icon path from the root of the extension.
     */
    export function getIcon(status = StatusCode.OFF, size = 0) {
        let sizeString = "";
        if (size === 19) {
            sizeString = `${size}`;
        }
        return `img/icon/${NAME[status]}${sizeString}.png`;
    }

    /**
     * Set any status and inform the popup and the icon that they should be updated.
     * Or it sets the OFF flag if the logging is not enabled.
     * @param status
     */
    export function set(status: StatusCode) {
        if (Options.getLogging()) {
            this.setter(status);
        } else {
            this.setter(StatusCode.OFF);
        }
    }

    /**
     * Helper method for set() in order to prevent duplicate code.
     * @param status
     */
    export function setter(status: StatusCode) {
        chrome.runtime.sendMessage({
            line: MESSAGE[status],
            path: this.getIcon(status),
        });
        chrome.storage.local.set({
            line: MESSAGE[status],
            path: this.getIcon(status),
        });
        chrome.browserAction.setIcon({
            path: this.getIcon(status, 19),
        });
    }
}
