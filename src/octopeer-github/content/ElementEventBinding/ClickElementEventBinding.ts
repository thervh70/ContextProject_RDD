/// <reference path="../ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/**
 * Created by Youri on 04/05/2016.
 * Class for adding click events.
 */
class ClickElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    private eventType: string = "click";
    /**
     * The ID of the Event
     */
    private eventID: EventID  = EventID.CLICK;

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
