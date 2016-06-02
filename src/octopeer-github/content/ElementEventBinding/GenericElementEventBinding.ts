/**
 * Created by Mathias on 2016-06-02.
 */
class GenericElementEventBinding implements ElementEventBinding {

    /** The EventID. */
    private eventID: EventID;
    /** The name. */
    private eventType: string;

    constructor(elementSelectionBehaviour: GenericElementSelectionBehaviour, data: ElementEventBindingData) {
        this.eventID = data.eventID;
        this.eventType = data.name;
        this.initDOMEvent(elementSelectionBehaviour);
    }

    /**
     * Get the EventID.
     * @returns {EventID}
     */
    public getEventID() {
        return this.eventID;
    }

    /**
     * Get the eventName.
     * @returns {string}
     */
    public getEventType() {
        return this.eventType;
    }

    /**
     * Make sure the Event is hooked to the DOM.
     * @param elementSelectionBehaviour The GenericElementSelectionBehaviour
     * whose callback should be used on the firing of this Event.
     */
    private initDOMEvent(elementSelectionBehaviour: GenericElementSelectionBehaviour) {
        const elements = elementSelectionBehaviour.getElements();
        elements.off(this.eventType);
        elements.on(
            this.eventType,
            elementSelectionBehaviour.getCallback(this.eventID)
        );
    }
}
