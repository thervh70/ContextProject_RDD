/**
 * Created by Mathias on 2016-05-11.
 * Class to add Keystroke events
 */

class KeystrokeElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    private eventType: string = "keystroke";
    /**
     * The ID of the Event
     */
    private eventID: EventID  = new EventID(102);

    /**
     * Getter for the EventType
     * @returns {string}
     */
    public getEventType(): string {
        return this.eventType;
    }

    /**
     * Getter for the EventID
     * @returns {EventID}
     */
    public getEventID(): EventID {
        return this.eventID;
    }

    /**
     * Constructor, creates the object and adds the event handler to the elements selected by the elementSelectionBehaviour.
     * @param elementSelectionBehaviour dictates what elements are selected.
     */
    constructor(private elementSelectionBehaviour: ElementSelectionBehaviour) {
        elementSelectionBehaviour.getElements().on(
            this.eventType,
            this.elementSelectionBehaviour.getCallback(this.eventID)
        );
    }
}
