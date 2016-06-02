/// <reference path="Options.ts"/>
/// <reference path="../Array.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBindingData.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBindingFactory.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviourData.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviourFactory.ts"/>

/**
 * Created by Youri on 19-5-2016.
 * Additional type for storing tuples of Element and Event ID.
 */
type ElementXEventID = {
    element: ElementID,
    event: EventID
};

interface ElementThatShouldNotBeWatchedTuple extends Array<string | Array<ElementID>> {
    0: string;
    1: Array<ElementID>;
}

interface EventThatShouldNotBeWatchedTuple extends Array<string | Array<EventID>> {
    0: string;
    1: Array<EventID>;
}

interface CombinationsThatShouldNotBeWatchedTuple extends Array<string | Array<ElementXEventID>> {
    0: string;
    1: Array<ElementXEventID>;
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
        ["doNotWatchOnScreenEvents", [EventID.SCROLL_INTO_VIEW, EventID.SCROLL_OUT_OF_VIEW]],
        ["doNotWatchHoverEvents", [EventID.MOUSE_ENTER, EventID.MOUSE_LEAVE]],
        ["doNotWatchKeyboardShortcutEvents", [EventID.KEYSTROKE]],
    ];

    private combinationsThatShouldNotBeWatched: CombinationsThatShouldNotBeWatchedTuple[] = [];

    public shouldElementBeWatched(element: ElementID) {
        return !this.getElements().contains(element);
    }

    public shouldEventBeWatched(event: EventID) {
        return !this.getEvents().contains(event);
    }

    public shouldCombinationBeWatched(combination: ElementXEventID) {
        return !this.getCombinations().contains(combination);
    }

    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementID[]}
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
     * @returns {EventID[]}
     */
    public getEvents() {
        let doNotWatchEvents: EventID[] = [];
        for (let tuple of this.eventsThatShouldNotBeWatched) {
            if (Options.getOption(tuple[0])) {
                for (let event of tuple[1]) {
                    doNotWatchEvents.push(event);
                }
            }
        }
        return doNotWatchEvents;
    }

    /**
     * Gets Combinations not to Log, from the chrome storage.
     * This is currently just a placeholder for the structure to be used.
     * @returns {ElementXEventID[]}
     */
    public getCombinations() {
        let doNotWatchCombinations: ElementXEventID[] = [];
        for (let tuple of this.combinationsThatShouldNotBeWatched) {
            if (Options.getOption(tuple[0])) {
                for (let combination of tuple[1]) {
                    doNotWatchCombinations.push(combination);
                }
            }
        }
        return doNotWatchCombinations;
    }
})();
