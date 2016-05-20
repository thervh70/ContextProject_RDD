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

    /**
     * Initialization fetches the current settings and stores them in this class.
     */
    public init() {
        chrome.storage.sync.get(["loggingEnabled", "trackTabs", "trackComments", "trackPeerComments",
        "trackFocus", "hashUsername", "hashRepo", "hashFile"], function (obj) {
            const object = <any> obj;
            this.logging = object.loggingEnabled;
            this.tabs = object.trackTabs;
            this.comments = object.trackComments;
            this.peer_comments = object.trackPeerComments;
            this.focus = object.trackFocus;
            this.username = object.hashUsername;
            this.repo = object.hashRepo;
            this.file = object.hashFile;
        });
    }

    /**
     * Enables a listener that listens for changes in the sync storage area.
     * This means that any items that was changed (newValue) is set if changed;
     */
    public update() {
        chrome.storage.onChanged.addListener(function (changes, areaName) {
            if (areaName === "sync") {
                const changeObject = <any> changes;
                this.logging = changeObject.loggingEnabled ? changeObject.loggingEnabled.newValue : this.logging;
                this.tabs = changeObject.trackTabs ? changeObject.trackTabs.newValue : this.tabs;
                this.comments = changeObject.trackComments ? changeObject.trackComments.newValue : this.comments;
                this.peer_comments = changeObject.trackPeerComments ? changeObject.trackPeerComments.newValue : this.peer_comments;
                this.focus = changeObject.trackFocus ? changeObject.trackFocus.newValue : this.focus;
                this.username = changeObject.hashUsername ? changeObject.hashUsername.newValue : this.username;
                this.repo = changeObject.hashRepo ? changeObject.hashRepo.newValue : this.repo;
                this.file = changeObject.hashFile ? changeObject.hashFile.newValue : this.file;
            }
        });
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
Options.getLogging(); // Suppress unused variable
