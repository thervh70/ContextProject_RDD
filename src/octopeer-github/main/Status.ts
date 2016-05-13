/**
 * The Status class handles the correct storage of the status.
 * The status object is stored in the Chrome storage.
 * There are 4 flags: 0 (error), 1 (running), 2 (off) and 3 (standby).
 */

enum StatusCode {ERROR, RUNNING, OFF, STANDBY}

class Status {

    /**
     * Status.NAME: the internal names of the enum StatusCode.
     */
    public static get NAME() {
        return [
            "error",
            "running",
            "off",
            "standby",
        ];
    }

    /**
     * Status.MESSAGE: the message strings of the enum StatusCode.
     */
    public static get MESSAGE() {
        return [
            "Octopeer has crashed!",
            "Octopeer is running.",
            "Octopeer is turned off.",
            "Octopeer is standby.",
        ];
    }

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
        chrome.storage.local.set({
            status: status,
        });

        chrome.runtime.sendMessage({line: Status.MESSAGE[status], path: this.getIcon(status)});
        chrome.browserAction.setIcon({path: this.getIcon(status, 19)});
    }

    /**
     * Gets the correct status icon based on StatusCode and size.
     * @param status        the StatusCode to get the icon for.
     * @param size          the size of the icon file (if it does not exist, it returns the largest icon).
     * @returns {string}    the relative icon path from the root of the extension.
     */
    public getIcon(status = StatusCode.OFF, size = 0) {
        let sizeString = "";
        switch (size) {
            case 19: // can have multiple (valid) cases later, like 16, 38, 48 or 128
                sizeString = `${size}`;
                break;
            default: break;
        }
        return `img/icon/icon_${Status.NAME[status]}${sizeString}.png`;
    }
}
