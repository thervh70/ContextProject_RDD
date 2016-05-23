// TODO Should this be monitored? How should this be monitored? Not part of js events.
/**
 * Created by Mathias on 2016-05-11.
 * Class to create ScrollIntoView events
 */
class ScrollIntoViewElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    private eventType: string = "scrollintoview";
    /**
     * The ID of the Event
     */
    private eventID: EventID  = EventID.SCROLLINTOVIEW;

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
        const elements = elementSelectionBehaviour.getElements();
        elements.off(this.eventType);
        elements.on(
            this.eventType,
            this.elementSelectionBehaviour.getCallback(this.eventID)
        );
    }
}
