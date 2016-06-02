/**
 * Created by Youri on 03/05/2016.
 */
type EventHandler = (eventObject: JQueryEventObject) => void;

/**
 * The element selection behaviour.
 * this is used by the tracker and ElementEventBinding
 */
interface ElementSelectionBehaviour {

    /**
     * Get the elementID corresponding with the database elementID.
     */
    getElementID(): ElementID;

    /**
     * Retrieve the elements this behaviour selects from the dom tree.
     */
    getElements(): JQuery;

    /**
     * Handle the event.
     */
    getCallback(eventID: EventID): EventHandler;
}
