/**
 * Created by Youri on 19-5-2016.
 */

/**
 * Additional type for storing tuples of Element and Event Creatables.
 */
type ElementXEventCreatable = {
    element: ElementSelectionBehaviourCreatable,
    event: ElementEventBindingCreatable
};

/**
 * Class for indicating all internal settings of the application.
 */
const DoNotWatchSettings = new (class Logger {
    private doNotWatchElements: ElementSelectionBehaviourCreatable[];
    private doNotWatchEvents: ElementEventBindingCreatable[];
    private doNotWatchCombination: ElementXEventCreatable[];

    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getElements() {
        chrome.storage.sync.get("doNotWatchElements", function (obj: ElementSelectionBehaviourCreatable[]) {
            this.doNotWatchElements = obj;
        });
        return this.doNotWatchElements;
    }
    /**
     * Gets Events not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getEvents() {
        chrome.storage.sync.get("doNotWatchEvents", function (obj: ElementEventBindingCreatable[]) {
            this.doNotWatchEvents = obj;
        });
        return this.doNotWatchEvents;
    }
    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getCombinations() {
        chrome.storage.sync.get("doNotWatchCombination", function (obj: ElementXEventCreatable[]) {
            this.doNotWatchCombination = obj;
        });
        return this.doNotWatchCombination;
    }
})();
DoNotWatchSettings.getElements() // supress unused variable warning