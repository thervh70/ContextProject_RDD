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
     * The ID of the Element
     */
    elementID: ElementID;
    /**
     * The description of the Element
     */
    elementDsc: string;
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


/**
 * Makes it so we can instantiate by class name, for reference see:
 * http://stackoverflow.com/questions/13407036/how-does-typescript-interfaces-with-construct-signatures-work
 */
interface ElementSelectionBehaviourCreatable {
    /**
     * Creates a ElementSelectionBehaviour object.
     * @param database the database to push to.
     */
    new (database: DatabaseAdaptable): ElementSelectionBehaviour;
}
