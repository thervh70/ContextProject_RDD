// TODO Should this be monitored? How should this be monitored? Not part of js events.
/**
 * Created by Mathias on 2016-05-11.
 * Class to create ScrollOutOfView events
 */
class ScrollOutOfViewElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    private eventType: string = "scrolloutofview";
    /**
     * The ID of the Event
     */
    private eventID: EventID  = new EventID(302);

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
