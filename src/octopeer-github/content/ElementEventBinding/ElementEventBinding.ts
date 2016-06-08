/// <reference path="../ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>

/**
 * Created by Youri on 03/05/2016.
 * ElementEventBinding dictates on what events the callback should be called.
 */
interface ElementEventBinding {

    /**
     * The type of the Event
     */
    getEventType(): string;

    /**
     * The ID of the Event
     */
    getEventID(): EventID;

    /**
     * When called, the ElementEventBinding should hook itself to the DOM tree.
     */
    addDOMEvent(elementSelectionBehaviour?: ElementSelectionBehaviour): void;

    /**
     * When called, the ElementEventBinding should remove itself from the DOM tree.
     */
    removeDOMEvent(): void;
}
