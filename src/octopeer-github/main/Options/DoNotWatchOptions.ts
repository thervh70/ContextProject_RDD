/// <reference path="Options.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ClickElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/KeystrokeElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/MouseEnterElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/MouseLeaveElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ScrollIntoViewElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ScrollOutOfViewElementEventBinding.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/AbstractElementSelectionBehaviour.ts"/>
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
const factory = new ElementSelectionBehaviourFactory();
// tslint:disable-next-line:no-unused-variable
const DoNotWatchOptions = new (class DoNotWatchOptions {
    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getElements() {
        let doNotWatchElements: ElementSelectionBehaviourData[] = [];
        if (Options.getDoNotWatchCommentElements()) {
            doNotWatchElements.push(factory.findElementSelectionBehaviourData(ElementID.CONFIRM_INLINE_COMMENT));
            doNotWatchElements.push(factory.findElementSelectionBehaviourData(ElementID.CREATE_PR_COMMENT));
            doNotWatchElements.push(factory.findElementSelectionBehaviourData(ElementID.EDIT_COMMENT));
        }
        return doNotWatchElements;
    }
    /**
     * Gets Events not to Log, from the chrome storage.
     * @returns {ElementEventBindingCreatable[]}
     */
    public getEvents() {
        let doNotWatchEvents: ElementEventBindingCreatable[] = [];

        if (Options.getDoNotWatchOnScreenEvents()) {
            doNotWatchEvents.push(ScrollIntoViewElementEventBinding);
            doNotWatchEvents.push(ScrollOutOfViewElementEventBinding);
        }
        if (Options.getDoNotWatchHoverEvents()) {
            doNotWatchEvents.push(MouseEnterElementEventBinding);
            doNotWatchEvents.push(MouseLeaveElementEventBinding);
        }
        if (Options.getDoNotWatchKeyboardShortcutEvents()) {
            doNotWatchEvents.push(KeystrokeElementEventBinding);
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
