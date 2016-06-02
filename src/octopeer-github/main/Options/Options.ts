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
    // A map that contains all option names and their default (boolean) values.
    private optionMap: { [key: string]: boolean; } = {
        ["loggingEnabled"]: true,
        ["trackTabs"]: true,
        ["trackComments"]: true,
        ["trackPeerComments"]: true,
        ["trackFocus"]: true,
        ["hashUsername"]: true,
        ["hashRepo"]: true,
        ["hashFile"]: false,
        ["doNotWatchOnScreenEvents"]: true,
        ["doNotWatchHoverEvents"]: true,
        ["doNotWatchCommentElements"]: true,
        ["doNotWatchKeyboardShortcutEvents"]: true,
    };

    private observers: OptionsObserver[];

    /**
     * Initialization fetches the current settings and stores them in this class.
     */
    public init() {
        const self = this;
        this.observers = [];
        let options: string[] = this.generateOptionList();
        chrome.storage.sync.get(options, function (obj) {
            const object = <any> obj;
            // For every option in optionMap, assign the values from the storage to them.
            for (let option in self.optionMap) {
                if (self.optionMap.hasOwnProperty(option)) {
                    self.optionMap[option] = object[option];
                }
            }
            self.update();
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
                // For every option in optionMap, assign only the new values from the storage to them.
                for (let option in self.optionMap) {
                    if (self.optionMap.hasOwnProperty(option)) {
                        self.optionMap[option] = changeObject[option] ? changeObject[option].newValue : self.optionMap[option];
                    }
                }
                self.notifyObservers();
            }
        });
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
