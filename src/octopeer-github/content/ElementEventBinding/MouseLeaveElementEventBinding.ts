/**
 * Created by Mathias on 2016-05-11.
 * Class to create MouseLeave events
 */
class MouseLeaveElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    private eventType: string = "mouseleave";
    /**
     * The ID of the Event
     */
    private eventID: EventID  = new EventID(203);

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
