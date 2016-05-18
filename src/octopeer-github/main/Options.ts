/**
 * Created by Mitchell on 12-5-2016.
 */

/**
 * Class from which user options can be retrieved.
 * These options have been maintained by the front-end.
 */
namespace Options {
    let logging: Boolean;
    let tabs: Boolean;
    let comments: Boolean;
    let peer_comments: Boolean;
    let focus: Boolean;
    let username: Boolean;
    let repo: Boolean;
    let file: Boolean;

    /**
     * Gets the logging preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getLogging() {
        chrome.storage.sync.get("loggingEnabled", function (obj) {
            this.logging = obj;
        });
        return logging;
    }

    /**
     * Gets the tab tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getTabs() {
        chrome.storage.sync.get("trackTabs", function (obj) {
            this.tabs = obj;
        });
        return tabs;
    }

    /**
     * Gets the comment tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getComments() {
        chrome.storage.sync.get("trackComments", function (obj) {
            this.comments = obj;
        });
        return comments;
    }

    /**
     * Gets the peer comments tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getPeerComments() {
        chrome.storage.sync.get("trackPeerComments", function (obj) {
            this.peer_comments = obj;
        });
        return peer_comments;
    }

    /**
     * Gets the focus tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getFocus() {
        chrome.storage.sync.get("trackFocus", function (obj) {
            this.focus = obj;
        });
        return focus;
    }

    /**
     * Gets the username encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getUsername() {
        chrome.storage.sync.get("hashUsername", function (obj) {
            this.username = obj;
        });
        return username;
    }

    /**
     * Gets the repository encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getRepo() {
        chrome.storage.sync.get("hashRepo", function (obj) {
            this.repo = obj;
        });
        return repo;
    }

    /**
     * Gets the file encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getFile() {
        chrome.storage.sync.get("hashFile", function (obj) {
            this.file = obj;
        });
        return file;
    }
}
