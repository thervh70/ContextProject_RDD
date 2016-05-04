/**
 * Created by Youri on 03/05/2016.
 */

type EventID = number;
type EventHandler = (eventObject: JQueryEventObject) => void;

/**
 * ElementEventBindingBehaviour dictates on what events the callback should be called.
 */
interface ElementEventBindingBehaviour {
    /**
     * Get the ElementID
     */
    getElementID(): ElementID;
    /**
     * Get the EventID
     */
    getEventID(): EventID;
}
