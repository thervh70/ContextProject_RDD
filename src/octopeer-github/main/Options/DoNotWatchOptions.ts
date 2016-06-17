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

/**
 * Interface used to make sure that the elements of the tuples in the elementsThatShouldNotBeWatched list are typed.
 */
interface ElementThatShouldNotBeWatchedTuple extends Array<string | Array<ElementID>> {
    0: string;
    1: Array<ElementID>;
}

/**
 * Interface used to make sure that the elements of the tuples in the eventsThatShouldNotBeWatched list are typed.
 */
interface EventThatShouldNotBeWatchedTuple extends Array<string | Array<EventID>> {
    0: string;
    1: Array<EventID>;
}

/**
 * Interface used to make sure that the elements of the tuples in the combinationsThatShouldNotBeWatched list are typed.
 */
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
        [Options.DATA_COMMENTS, [
            ElementID.CONFIRM_INLINE_COMMENT,
            ElementID.CREATE_PR_COMMENT,
            ElementID.EDIT_COMMENT,
        ]],
    ];

    private eventsThatShouldNotBeWatched: EventThatShouldNotBeWatchedTuple[] = [
        [Options.MOUSE_SCROLLING, [EventID.SCROLL]],
        [Options.MOUSE_HOVER, [EventID.MOUSE_ENTER, EventID.MOUSE_LEAVE]],
        [Options.MOUSE_CLICK, [EventID.CLICK]],
        [Options.DATA_KEYSTROKES, [EventID.KEYSTROKE]],
    ];

    private combinationsThatShouldNotBeWatched: CombinationsThatShouldNotBeWatchedTuple[] = [];

    /**
     * Checks whether an element should be watched.
     * @param element the element to check for.
     * @returns {boolean} whether the element should be watched.
     */
    public shouldElementBeWatched(element: ElementID) {
        return !this.getElements().contains(element);
    }

    /**
     * Checks whether an event should be watched.
     * @param event the event to check for.
     * @returns {boolean} whether the event should be watched.
     */
    public shouldEventBeWatched(event: EventID) {
        return !this.getEvents().contains(event);
    }

    /**
     * Checks whether an combination should be watched.
     * @param combination the combination to check for.
     * @returns {boolean} whether the combination should be watched.
     */
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
            if (!Options.get(tuple[0])) {
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
            if (!Options.get(tuple[0])) {
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
            if (!Options.get(tuple[0])) {
                for (let combination of tuple[1]) {
                    doNotWatchCombinations.push(combination);
                }
            }
        }
        return doNotWatchCombinations;
    }
})();
