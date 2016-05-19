/**
 * Created by Mitchell on 12-5-2016.
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
    let observers: Array<OptionsObserver>;

    /**
     * Initialization fetches the current settings and stores them in this class.
     */
    export function init() {
        chrome.storage.sync.get(["loggingEnabled", "trackTabs", "trackComments", "trackPeerComments",
        "trackFocus", "hashUsername", "hashRepo", "hashFile"], function (obj) {
            const object = <any> obj;
            logging = object.loggingEnabled;
            tabs = object.trackTabs;
            comments = object.trackComments;
            peer_comments = object.trackPeerComments;
            focus = object.trackFocus;
            username = object.hashUsername;
            repo = object.hashRepo;
            file = object.hashFile;
            notifyObservers();
        });
    }

    /**
     * Enables a listener that listens for changes in the sync storage area.
     * This means that any items that was changed (newValue) is set if changed;
     */
    export function update() {
        chrome.storage.onChanged.addListener(function (changes, areaName) {
            if (areaName === "sync") {
                const changeObject = <any> changes;
                logging = changeObject.loggingEnabled ? changeObject.loggingEnabled.newValue : logging;
                tabs = changeObject.trackTabs ? changeObject.trackTabs.newValue : tabs;
                comments = changeObject.trackComments ? changeObject.trackComments.newValue : comments;
                peer_comments = changeObject.trackPeerComments ? changeObject.trackPeerComments.newValue : peer_comments;
                focus = changeObject.trackFocus ? changeObject.trackFocus.newValue : focus;
                username = changeObject.hashUsername ? changeObject.hashUsername.newValue : username;
                repo = changeObject.hashRepo ? changeObject.hashRepo.newValue : repo;
                file = changeObject.hashFile ? changeObject.hashFile.newValue : file;
                notifyObservers();
            }
        });
    }

    /**
     * Notify the whole list of observers that there has been a change.
     * The observer is reponsible for fetching the correct data after this change.
     */
    export function notifyObservers() {
        for (const observer of observers) {
            observer.notify();
        }
    }

    /**
     * It is possible to subscribe to the Options class.
     * @param obs The Observer that wants to be part of the notification stream.
     */
    export function addObserver(obs: OptionsObserver) {
        this.observers.push(obs);
    }

    /**
     * Gets the logging preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getLogging() {
        return logging;
    }

    /**
     * Gets the tab tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getTabs() {
        return tabs;
    }

    /**
     * Gets the comment tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getComments() {
        return comments;
    }

    /**
     * Gets the peer comments tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getPeerComments() {
        return peer_comments;
    }

    /**
     * Gets the focus tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getFocus() {
        return focus;
    }

    /**
     * Gets the username encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getUsername() {
        return username;
    }

    /**
     * Gets the repository encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getRepo() {
        return repo;
    }

    /**
     * Gets the file encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    export function getFile() {
        return file;
    }
}
