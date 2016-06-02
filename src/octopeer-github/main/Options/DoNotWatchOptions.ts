/// <reference path="Options.ts"/>
/// <reference path="../Array.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ClickElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/KeystrokeElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/MouseEnterElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/MouseLeaveElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ScrollIntoViewElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ScrollOutOfViewElementEventBinding.ts"/>
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

interface ElementThatShouldNotBeWatchedTuple extends Array<string | Array<ElementSelectionBehaviourCreatable>> {
    0: string;
    1: Array<ElementSelectionBehaviourCreatable>;
}

interface EventThatShouldNotBeWatchedTuple extends Array<string | Array<ElementEventBindingCreatable>> {
    0: string;
    1: Array<ElementEventBindingCreatable>;
}

interface CombinationsThatShouldNotBeWatchedTuple extends Array<string | Array<ElementXEventCreatable>> {
    0: string;
    1: Array<ElementXEventCreatable>;
}

/**
 * Class for indicating all internal options of the application.
 */
const factory = new ElementSelectionBehaviourFactory();
// tslint:disable-next-line:no-unused-variable
const DoNotWatchOptions = new (class DoNotWatchOptions {

    private elementsThatShouldNotBeWatched: ElementThatShouldNotBeWatchedTuple[] = [
        ["doNotWatchCommentElements", [
            CommentInlineCommentButtonElementSelectionBehaviour,
            CommentPRButtonElementSelectionBehaviour,
            EditCommentButtonElementSelectionBehaviour,
        ]],
    ];

    private eventsThatShouldNotBeWatched: EventThatShouldNotBeWatchedTuple[] = [
        ["doNotWatchOnScreenEvents", [ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]],
        ["doNotWatchHoverEvents", [MouseEnterElementEventBinding, MouseLeaveElementEventBinding]],
        ["doNotWatchKeyboardShortcutEvents", [KeystrokeElementEventBinding]],
    ];

    private combinationsThatShouldNotBeWatched: CombinationsThatShouldNotBeWatchedTuple[] = [];

    public shouldElementBeWatched(element: ElementSelectionBehaviourCreatable) {
        return !this.getElements().contains(element);
    }

    public shouldEventBeWatched(event: ElementEventBindingCreatable) {
        return !this.getEvents().contains(event);
    }

    public shouldCombinationBeWatched(combination: ElementXEventCreatable) {
        return !this.getCombinations().contains(combination);
    }

    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getElements() {
<<<<<<< HEAD
        let doNotWatchElements: ElementSelectionBehaviourCreatable[] = [];
        for (let tuple of this.elementsThatShouldNotBeWatched) {
            if (Options.getOption(tuple[0])) {
                for (let element of tuple[1]) {
                    doNotWatchElements.push(element);
                }
            }
=======
        let doNotWatchElements: ElementSelectionBehaviourData[] = [];
        if (Options.getDoNotWatchCommentElements()) {
            doNotWatchElements.push(factory.findElementSelectionBehaviourData(ElementID.CONFIRM_INLINE_COMMENT));
            doNotWatchElements.push(factory.findElementSelectionBehaviourData(ElementID.CREATE_PR_COMMENT));
            doNotWatchElements.push(factory.findElementSelectionBehaviourData(ElementID.EDIT_COMMENT));
>>>>>>> 95-esb-lists
        }
        return doNotWatchElements;
    }
    /**
     * Gets Events not to Log, from the chrome storage.
     * @returns {ElementEventBindingCreatable[]}
     */
    public getEvents() {
        let doNotWatchEvents: ElementEventBindingCreatable[] = [];
        for (let tuple of this.eventsThatShouldNotBeWatched) {
            if (Options.getOption(tuple[0])) {
                for (let element of tuple[1]) {
                    doNotWatchEvents.push(element);
                }
            }
        }
        return doNotWatchEvents;
    }

    /**
     * Gets Combinations not to Log, from the chrome storage.
     * This is currently just a placeholder for the structure to be used.
     * @returns {ElementXEventCreatable[]}
     */
    public getCombinations() {
        let doNotWatchCombinations: ElementXEventCreatable[] = [];
        for (let tuple of this.combinationsThatShouldNotBeWatched) {
            if (Options.getOption(tuple[0])) {
                for (let element of tuple[1]) {
                    doNotWatchCombinations.push(element);
                }
            }
        }
        return doNotWatchCombinations;
    }
})();
