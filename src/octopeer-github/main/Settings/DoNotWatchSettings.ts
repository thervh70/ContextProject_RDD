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
namespace DoNotWatchSettings {
    let doNotWatchElements: ElementSelectionBehaviourCreatable[];
    let doNotWatchEvents: ElementEventBindingCreatable[];
    let doNotWatchCombination: ElementXEventCreatable[];

    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    export function getElements() {
        chrome.storage.sync.get("doNotWatchElements", function (obj: ElementSelectionBehaviourCreatable[]) {
            this.doNotWatchElements = obj;
        });
        return this.doNotWatchElements;
    }
    /**
     * Gets Events not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    export function getEvents() {
        chrome.storage.sync.get("doNotWatchEvents", function (obj: ElementEventBindingCreatable[]) {
            this.doNotWatchEvents = obj;
        });
        return this.doNotWatchEvents;
    }
    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    export function getCombinations() {
        chrome.storage.sync.get("doNotWatchCombination", function (obj: ElementXEventCreatable[]) {
            this.doNotWatchCombination = obj;
        });
        return this.doNotWatchCombination;
    }
}
