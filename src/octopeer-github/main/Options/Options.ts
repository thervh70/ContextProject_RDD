/// <reference path="OptionsObserver.ts"/>
/**
 * Created by Mitchell on 12-5-2016.
 * Class from which user options can be retrieved.
 * These options have been maintained by the front-end.
 * The specific options to be used are still not definitive.
 * The options displayed below are mainly there for showing the structure of the Options class,
 * and being able to create the bindings between the content controller, and such with the Options class.
 */
// tslint:disable-next-line:no-unused-variable
const Options = new (class Options {

    /**
     * All strings that are used in the Chrome Storage are hidden behind these public static final fields.
     * The implementation is not with static, because Options is a Singleton.
     */
    public get LOGGING() {return "loggingEnabled"; }
    public get TRACK_TABS() {return "trackTabs"; }
    public get TRACK_COMMENTS() {return "trackComments"; }
    public get TRACK_PEER_COMMENTS() {return "trackPeerComments"; }
    public get TRACK_FOCUS() {return "trackFocus"; }
    public get HASH_USERNAME() {return "hashUsername"; }
    public get HASH_REPO() {return "hashRepo"; }
    public get HASH_FILE() {return "hashFile"; }
    public get DNW_ON_SCREEN_EVENTS() {return "doNotWatchOnScreenEvents"; }
    public get DNW_HOVER_EVENTS() {return "doNotWatchHoverEvents"; }
    public get DNW_COMMENT_ELEMENTS() {return "doNotWatchCommentElements"; }
    public get DNW_KEYBOARD_EVENTS() {return "doNotWatchKeyboardShortcutEvents"; }

    // A map that contains all option names and their default (boolean) values.
    private optionMap: { [key: string]: boolean; } = {
        [this.LOGGING]: true,
        [this.TRACK_TABS]: true,
        [this.TRACK_COMMENTS]: true,
        [this.TRACK_PEER_COMMENTS]: true,
        [this.TRACK_FOCUS]: true,
        [this.HASH_USERNAME]: true,
        [this.HASH_REPO]: true,
        [this.HASH_FILE]: false,
        [this.DNW_ON_SCREEN_EVENTS]: true,
        [this.DNW_HOVER_EVENTS]: true,
        [this.DNW_COMMENT_ELEMENTS]: true,
        [this.DNW_KEYBOARD_EVENTS]: true,
    };

    private observers: OptionsObserver[];

    /**
     * Initialization fetches the current settings and stores them in this class.
     * Besides, enables a listener that listens for changes in the sync storage area.
     * This means that any items that was changed (newValue) is set if changed;
     */
    public init() {
        this.observers = [];
        let options: string[] = this.generateOptionList();
        chrome.storage.sync.get(options, this.syncOptionMap);
        chrome.storage.onChanged.addListener((obj, area) => {if (area === "sync") {this.syncOptionMap(obj); }});
    }

    /**
     * Handles synchronization of the optionMap by retrieving values from the chrome storage on initialization and on update.
     * @param changeObject set of chrome storage properties.s
     */
    public syncOptionMap (changeObject: any) {
        // For every option in optionMap, assign only the new values from the storage to them.
        for (let option in this.optionMap) {
            if (this.optionMap.hasOwnProperty(option)) {
                this.optionMap[option] = changeObject[option] ? changeObject[option].newValue : this.optionMap[option];
            }
        }
        this.notifyObservers();
    }

    /**
     * Notify the whole list of observers that there has been a change.
     * The observer is responsible for fetching the correct data after this change.
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
     * Remove a certain OptionsObserver.
     * @param obs The Observer that has to be deleted from the list.
     */
    public removeObserver(obs: OptionsObserver) {
        const index = this.observers.indexOf(obs);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    /**
     * Returns the list of observers.
     * @returns {Array<OptionsObserver>}
     */
    public getObservers() {
        return this.observers;
    }

    /**
     * Generates an array containing all option names, based on the optionMap.
     * @returns {Array<String>} the list of option names.
     */
    public generateOptionList(): string[] {
        let options: string[] = [];
        // For every key in optionMap, push the optionName (thus key) to the to be outputted options array.
        for (let key in this.optionMap) {
            if (this.optionMap.hasOwnProperty(key)) {
                options.push(key);
            }
        }
        return options;
    }

    /**
     * Gets the preference of an option, based on the name, from the chrome storage.
     * If the name doesn't exist, false is simply returned.
     * @param optionName the given name of an option.
     * @returns {boolean} the user preference in terms of a boolean.
     */
    public getOption(optionName: string) {
        let res: Boolean = false;
        if (optionName in this.optionMap) {
            res = this.optionMap[optionName];
        }
        return res;
    }

})();
