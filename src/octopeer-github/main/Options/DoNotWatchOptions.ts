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

interface ElementThatShouldNotBeWatchedTuple extends Array<string | Array<ElementID>> {
    0: string;
    1: Array<ElementID>;
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
// tslint:disable-next-line:no-unused-variable
const DoNotWatchOptions = new (class DoNotWatchOptions {

    private elementsThatShouldNotBeWatched: ElementThatShouldNotBeWatchedTuple[] = [
        ["doNotWatchCommentElements", [
            ElementID.CONFIRM_INLINE_COMMENT,
            ElementID.CREATE_PR_COMMENT,
            ElementID.EDIT_COMMENT,
        ]],
    ];

    private eventsThatShouldNotBeWatched: EventThatShouldNotBeWatchedTuple[] = [
        ["doNotWatchOnScreenEvents", [ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]],
        ["doNotWatchHoverEvents", [MouseEnterElementEventBinding, MouseLeaveElementEventBinding]],
        ["doNotWatchKeyboardShortcutEvents", [KeystrokeElementEventBinding]],
    ];

    private combinationsThatShouldNotBeWatched: CombinationsThatShouldNotBeWatchedTuple[] = [];

    public shouldElementBeWatched(element: ElementID) {
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
        let doNotWatchElements: ElementID[] = [];
        for (let tuple of this.elementsThatShouldNotBeWatched) {
            if (Options.getOption(tuple[0])) {
                for (let element of tuple[1]) {
                    doNotWatchElements.push(element);
                }
            }
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
