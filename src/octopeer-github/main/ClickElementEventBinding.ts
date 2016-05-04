/**
 * Created by Youri on 04/05/2016.
 */

/**
 * Class for adding click events.
 */
class ClickElementEventBindingBehaviour implements ElementEventBindingBehaviour {
    private eventType: string = "click";
    private eventID: EventID   = 1;

    /**
     * Constructor, creates the object and adds the event handler to the elements selected by the elementSelectionBehaviour.
     * @param elementSelectionBehaviour dictates what elements are selected.
     * @param eventHandler the callback when this event fires on the selected objects.
     */
    constructor(private elementSelectionBehaviour: ElementSelectionBehaviour, eventHandler: EventHandler) {
        elementSelectionBehaviour.getElements().on(
            this.eventType,
            eventHandler
        );
    }

    /**
     * Get the EventID of the event. Corrosopndents with the ID in the database.
     * @returns {EventID} the EventID of the event.
     */
    public getEventID() {
        return this.eventID;
    }

    /**
     * Get the elementID of the selected elements
     * * @returns {ElementID} get the ElementID.
     */
    public getElementID() {
        return this.elementSelectionBehaviour.getElementId();
    }
}
