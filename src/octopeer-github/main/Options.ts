/**
 * Created by Mitchell on 12-5-2016.
 * Class from which user options can be retrieved.
 * These options have been maintained by the front-end.
 */
const Options = new (class Options {
    private logging: Boolean;
    private tabs: Boolean;
    private comments: Boolean;
    private peer_comments: Boolean;
    private focus: Boolean;
    private username: Boolean;
    private repo: Boolean;
    private file: Boolean;
    private observers: OptionsObserver[];

    /**
     * Initialization fetches the current settings and stores them in this class.
     */
    public init() {
        const self = this;
        this.observers = [];
        chrome.storage.sync.get(["loggingEnabled", "trackTabs", "trackComments", "trackPeerComments",
        "trackFocus", "hashUsername", "hashRepo", "hashFile"], function (obj) {
            const object = <any> obj;
            self.logging = object.loggingEnabled;
            self.tabs = object.trackTabs;
            self.comments = object.trackComments;
            self.peer_comments = object.trackPeerComments;
            self.focus = object.trackFocus;
            self.username = object.hashUsername;
            self.repo = object.hashRepo;
            self.file = object.hashFile;
            self.notifyObservers();
        });
    }

    /**
     * Enables a listener that listens for changes in the sync storage area.
     * This means that any items that was changed (newValue) is set if changed;
     */
    public update() {
        const self = this;
        chrome.storage.onChanged.addListener(function (changes, areaName) {
            if (areaName === "sync") {
                const changeObject = <any> changes;
                self.logging = changeObject.loggingEnabled ? changeObject.loggingEnabled.newValue : self.logging;
                self.tabs = changeObject.trackTabs ? changeObject.trackTabs.newValue : self.tabs;
                self.comments = changeObject.trackComments ? changeObject.trackComments.newValue : self.comments;
                self.peer_comments = changeObject.trackPeerComments ? changeObject.trackPeerComments.newValue : self.peer_comments;
                self.focus = changeObject.trackFocus ? changeObject.trackFocus.newValue : self.focus;
                self.username = changeObject.hashUsername ? changeObject.hashUsername.newValue : self.username;
                self.repo = changeObject.hashRepo ? changeObject.hashRepo.newValue : self.repo;
                self.file = changeObject.hashFile ? changeObject.hashFile.newValue : self.file;
                self.notifyObservers();
            }
        });
    }

    /**
     * Notify the whole list of observers that there has been a change.
     * The observer is reponsible for fetching the correct data after this change.
     */
    public notifyObservers() {
        for (const observer of this.observers) {
            observer.notify();
        }
    }

    /**
     * It is possible to subscribe to the Options class.
     * @param obs The Observer that wants to be part of the notification stream.
     */
    public addObserver(obs: OptionsObserver) {
        this.observers.push(obs);
    }

    /**
     * Gets the logging preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getLogging() {
        return this.logging;
    }

    /**
     * Gets the tab tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getTabs() {
        return this.tabs;
    }

    /**
     * Gets the comment tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getComments() {
        return this.comments;
    }

    /**
     * Gets the peer comments tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getPeerComments() {
        return this.peer_comments;
    }

    /**
     * Gets the focus tracking preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getFocus() {
        return this.focus;
    }

    /**
     * Gets the username encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getUsername() {
        return this.username;
    }

    /**
     * Gets the repository encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getRepo() {
        return this.repo;
    }

    /**
     * Gets the file encryption preference, from the chrome storage.
     * @returns {Boolean}
     */
    public getFile() {
        return this.file;
    }
})();
Options.getLogging();
