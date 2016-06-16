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

    // A map that contains all option names and their (boolean) values.
    // The first boolean value represents the current value of an option and is updated.
    // The second boolean value represents the default value of an option.
    private optionMap: { [key: string]: [boolean]; } = {
        [this.LOGGING]: [true, true],
        [this.TRACK_TABS]: [true, true],
        [this.TRACK_COMMENTS]: [true, true],
        [this.TRACK_PEER_COMMENTS]: [true, true],
        [this.TRACK_FOCUS]: [true, true],
        [this.HASH_USERNAME]: [true, true],
        [this.HASH_REPO]: [true, true],
        [this.HASH_FILE]: [false, false],
        [this.DNW_ON_SCREEN_EVENTS]: [true, true],
        [this.DNW_HOVER_EVENTS]: [true, true],
        [this.DNW_COMMENT_ELEMENTS]: [true, true],
        [this.DNW_KEYBOARD_EVENTS]: [true, true],
    };

    private observers: OptionsObserver[];

    /**
     * Initialization fetches the current settings and stores them in this class.
     * Dynamic options are set to the sync storage and default options are set to the local storage.
     * Besides, enables a listener that listens for changes in the sync storage area.
     * This means that any items that was changed (newValue) is set if changed;
     */
    public init() {
        this.observers = [];
        chrome.storage.sync.set(this.generateCurrentOptionMap());
        chrome.storage.local.set(this.generateDefaultOptionMap());
        chrome.storage.onChanged.addListener((obj, area) => {if (area === "sync") {this.syncOptionMap(obj); }});
    }

    /**
     * Handles synchronization of the optionMap by retrieving values from the chrome storage on initialization and on update.
     * For every option in optionMap, only the new values from the storage are assigned to them, if they are defined.
     * If the new value is undefined, it won't be assigned.
     * @param changeObject the set of chrome storage properties.
     */
    public syncOptionMap(changeObject: any) {
        for (let option in changeObject) {
            if (typeof changeObject[option] === "boolean") {
                this.optionMap[option][0] = changeObject[option];
            } else {
                this.optionMap[option][0] = changeObject[option].newValue;
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
     * For every key in optionMap, the optionName (thus key) is pushed to the to be outputted options array.
     * @returns {Array<String>} the list of option names.
     */
    public generateOptionList(): string[] {
        let options: string[] = [];
        for (let key in this.optionMap) {
            if (this.optionMap.hasOwnProperty(key)) {
                options.push(key);
            }
        }
        return options;
    }

    /**
     * Splits the optionMap to a Map excluding the default values for options.
     * The currentOptionMap can be used for direct default option updates to the chrome storage.
     * @returns the currentOptionMap
     */
    public generateCurrentOptionMap(): { [key: string]: boolean; } {
        return this.generateSpecificOptionMap(0);
    }

    /**
     * Splits the optionMap to a defaultOptionMap which contains the default values for options.
     * The defaultOptionMap can be used for direct default option updates to the chrome storage.
     * @returns the defaultOptionMap.
     */
    public generateDefaultOptionMap(): { [key: string]: boolean; } {
        return this.generateSpecificOptionMap(1);
    }

    /**
     * Gets the preference of an option, based on the name.
     * If the name doesn't exist, false is simply returned.
     * @param optionName the given name of an option.
     * @returns {boolean} the user preference in terms of a boolean.
     */
    public get(optionName: string) {
        if (optionName in this.optionMap) {
            return this.optionMap[optionName][0];
        }
        return false;
    }

    /**
     * Gets the default value of an option, based on the name.
     * If the name doesn't exist, false is simply returned.
     * @param optionName the given name of an option.
     * @returns {boolean} the default value of an option.
     */
    public getDefault(optionName: string) {
        if (optionName in this.optionMap) {
            return this.optionMap[optionName][1];
        }
        return false;
    }
    /**
     * Splits the optionMap into a specific map, containing only the values based on a given index.
     * @param index integer that indicates the index of the boolean array.
     * @returns the specific option map.
     */
    private generateSpecificOptionMap(index: number) {
        let specificOptionMap: { [key: string]: boolean; } = {};
        for (let key in this.optionMap) {
            if (this.optionMap.hasOwnProperty(key)) {
                specificOptionMap[key] = this.optionMap[key][index];
            }
        }
        return specificOptionMap;
    }

})();
