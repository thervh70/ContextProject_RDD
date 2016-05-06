/**
 * Created by Youri on 03/05/2016.
 */
type ElementID = number;
type EventHandler = (eventObject: JQueryEventObject) => void;

/**
 * The element selection behaviour.
 * this is used by the tracker and ElementEventBinding
 */
interface ElementSelectionBehaviour {

    /**
     * Creates a ElementSelectionBehaviour object.
     * @param database the database to push to.
     */
    new (database: DatabaseAdaptable): ElementSelectionBehaviour;

    /**
     * Get the elementID corresponding with the database elementID.
     */
    getElementId(): ElementID;

    /**
     * Retieve the elements this behaviour selects from the dom tree.
     */
    getElements(): JQuery;

    /**
     * Handle the event.
     */
    getCallback(eventID: number): EventHandler;
}
