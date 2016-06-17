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
    public get LOGGING() {          return "loggingEnabled"; }
    public get MOUSE_HOVER() {      return "mouseHover"; }
    public get MOUSE_CLICK() {      return "mouseClick"; }
    public get MOUSE_SCROLLING() {  return "mouseScrolling"; }
    public get MOUSE_POSITION() {   return "mousePosition"; }
    public get DATA_COMMENTS() {    return "dataComments"; }
    public get DATA_KEYSTROKES() {  return "dataKeystrokes"; }
    public get DATA_HTML() {        return "dataHTML"; }
    public get DATA_TABS() {        return "dataTabs"; }
    public get DATA_RESOLUTION() {  return "dataResolution"; }

    /**
     * A option on the left should be disabled if the option on the right should be disabled.
     */
    public get DEPENDANCIES(): {[name: string]: string; }{
        return {
            [this.DATA_HTML]:           this.DATA_KEYSTROKES,
            [this.DATA_KEYSTROKES]:     this.DATA_COMMENTS ,
            [this.MOUSE_CLICK]:         this.MOUSE_HOVER,
            [this.DATA_RESOLUTION]:     this.DATA_RESOLUTION,
        };
    };

    /** A map that contains all option names and their (boolean) values.
     * The first boolean value represents the current value of an option and is updated.
     * The second boolean value represents the default value of an option.
     */
    private optionMap: { [key: string]: [boolean]; } = {
        [this.LOGGING]: [true, true],
        [this.MOUSE_HOVER]: [true, true],
        [this.MOUSE_CLICK]: [true, true],
        [this.MOUSE_SCROLLING]: [true, true],
        [this.MOUSE_POSITION]: [true, true],
        [this.DATA_COMMENTS]: [true, true],
        [this.DATA_KEYSTROKES]: [true, true],
        [this.DATA_HTML]: [false, false],
        [this.DATA_TABS]: [false, false],
        [this.DATA_RESOLUTION]: [false, false],
    };

    /**
     * A list for all observers of the Options object.
     */
    private observers: OptionsObserver[];

    /**
     * Initialization fetches the current settings and stores them in this class.
     * Dynamic options are set to the sync storage and default options are set to the local storage.
     * Besides, enables a listener that listens for changes in the sync storage area.
     * This means that any items that was changed (newValue) is set if changed;
     */
    public init() {
        this.observers = [];
        chrome.storage.sync.get(this.LOGGING, (res) => {
            let options = this.generateOptionList();
            if (res[this.LOGGING] === undefined) {
                chrome.storage.sync.set(this.generateCurrentOptionMap());
            } else {
                chrome.storage.sync.get(options, (obj) => this.syncOptionMap(obj));
            }
            chrome.storage.local.set(this.generateDefaultOptionMap());
            chrome.storage.onChanged.addListener((obj, area) => {if (area === "sync") {this.syncOptionMap(obj); }});
        });



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
            return this.optionMap[optionName][0] && this.dependentOption(optionName);
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

    /**
     * See if any options dependent on the given option are disabled,
     * If any of the dependent on options is disabled than return false.
     * If the option is allowed return true.
     * @param optionName the option to check
     * @returns {boolean}
     */
    private dependentOption(optionName: string): boolean {
        return !this.optionDependencies.hasOwnProperty(optionName) || this.get(this.optionDependencies[optionName]);
    }

})();
