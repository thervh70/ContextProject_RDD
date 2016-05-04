/**
 * Created by Youri on 03/05/2016.
 */

type EventID = number;

/**
 * ElementEventBinding dictates on what events the callback should be called.
 */
interface ElementEventBinding {
    /**
     * Get the ElementID
     */
    getElementID(): ElementID;
    /**
     * Get the EventID
     */
    getEventID(): EventID;
}
