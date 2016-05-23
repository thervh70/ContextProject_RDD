/**
 * Created by Mathias on 2016-05-11.
 * Class to enter MouseEnter events
 */
class MouseEnterElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    private eventType: string = "mouseenter";
    /**
     * The ID of the Event
     */
    private eventID: EventID  = EventID.MOUSEENTER;

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
