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
}
