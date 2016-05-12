/**
 * Created by Mitchell on 12-5-2016.
 */

/**
 * Class from which user settings can be retrieved.
 * These settings have been maintained by the front-end.
 */
class Settings {
    private logging: Boolean;
    private tabs: Boolean;
    private comments: Boolean;
    private peer_comments: Boolean;
    private focus: Boolean;
    private username: Boolean;
    private repo: Boolean;
    private file: Boolean;

    /**
     * Gets the logging preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getLogging() {
        chrome.storage.sync.get("loggingEnabled", function (obj) {
            this.logging = obj;
        });
        return this.logging;
    }

    /**
     * Gets the tab tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getTabs() {
        chrome.storage.sync.get("trackTabs", function (obj) {
            this.tabs = obj;
        });
        return this.tabs;
    }

    /**
     * Gets the comment tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getComments() {
        chrome.storage.sync.get("trackComments", function (obj) {
            this.comments = obj;
        });
        return this.comments;
    }

    /**
     * Gets the peer comments tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getPeerComments() {
        chrome.storage.sync.get("trackPeerComments", function (obj) {
            this.peer_comments = obj;
        });
        return this.peer_comments;
    }

    /**
     * Gets the focus tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getFocus() {
        chrome.storage.sync.get("trackFocus", function (obj) {
            this.focus = obj;
        });
        return this.focus;
    }

    /**
     * Gets the username encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getUsername() {
        chrome.storage.sync.get("hashUsername", function (obj) {
            this.username = obj;
        });
        return this.username;
    }

    /**
     * Gets the repository encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getRepo() {
        chrome.storage.sync.get("hashRepo", function (obj) {
            this.repo = obj;
        });
        return this.repo;
    }

    /**
     * Gets the file encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getFile() {
        chrome.storage.sync.get("hashFile", function (obj) {
            this.file = obj;
        });
        return this.file;
    }
}
