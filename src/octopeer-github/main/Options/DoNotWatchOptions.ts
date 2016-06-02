/// <reference path="Options.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBindingData.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBindingFactory.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviourData.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviourFactory.ts"/>

/**
 * Created by Youri on 19-5-2016.
 * Additional type for storing tuples of Element and Event Creatables.
 */
type ElementXEventCreatable = {
    element: ElementSelectionBehaviourData,
    event: ElementEventBindingCreatable
};

/**
 * Class for indicating all internal options of the application.
 */
const esbFactory = new ElementSelectionBehaviourFactory();
const eebFactory = new ElementEventBindingFactory();
// tslint:disable-next-line:no-unused-variable
const DoNotWatchOptions = new (class DoNotWatchOptions {
    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getElements() {
        let doNotWatchElements: ElementSelectionBehaviourData[] = [];
        if (Options.getDoNotWatchCommentElements()) {
            doNotWatchElements.push(esbFactory.findElementSelectionBehaviourData(ElementID.CONFIRM_INLINE_COMMENT));
            doNotWatchElements.push(esbFactory.findElementSelectionBehaviourData(ElementID.CREATE_PR_COMMENT));
            doNotWatchElements.push(esbFactory.findElementSelectionBehaviourData(ElementID.EDIT_COMMENT));
        }
        return doNotWatchElements;
    }
    /**
     * Gets Events not to Log, from the chrome storage.
     * @returns {ElementEventBindingCreatable[]}
     */
    public getEvents() {
        let doNotWatchEvents: ElementEventBindingData[] = [];

        if (Options.getDoNotWatchOnScreenEvents()) {
            doNotWatchEvents.push(eebFactory.findElementEventBindingData(EventID.SCROLL_INTO_VIEW));
            doNotWatchEvents.push(eebFactory.findElementEventBindingData(EventID.SCROLL_OUT_OF_VIEW));
        }
        if (Options.getDoNotWatchHoverEvents()) {
            doNotWatchEvents.push(eebFactory.findElementEventBindingData(EventID.MOUSE_ENTER));
            doNotWatchEvents.push(eebFactory.findElementEventBindingData(EventID.MOUSE_LEAVE));
        }
        if (Options.getDoNotWatchKeyboardShortcutEvents()) {
            doNotWatchEvents.push(eebFactory.findElementEventBindingData(EventID.KEYSTROKE));
        }
        return doNotWatchEvents;
    }

    /**
     * Gets Combinations not to Log, from the chrome storage.
     * This is currently just a placeholder for the structure to be used.
     * @returns {ElementXEventCreatable[]}
     */
    public getCombinations() {
        let doNotWatchCombination: ElementXEventCreatable[] = [];
        return doNotWatchCombination;
    }
})();
