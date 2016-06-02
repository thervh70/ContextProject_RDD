/**
 * Created by Mathias on 2016-06-02.
 * This is the Generic implementation of the ElementEventBinding interface.
 * These GenericElementEventBinding objects are created in the ElementEventBindingFactory.
 */
class GenericElementEventBinding implements ElementEventBinding {

    /** The EventID. */
    private eventID: EventID;
    /** The name. */
    private eventType: string;

    /**
     * Construct a GenericElementEventBinding, assign the proper values to the field (from the data)
     * and execute the initDOMEvent function
     * @param elementSelectionBehaviour
     * @param data
     */
    constructor(elementSelectionBehaviour: ElementSelectionBehaviour, data: ElementEventBindingData) {
        this.eventID = data.eventID;
        this.eventType = data.name;
        if (data.hookToDOM !== undefined) {
            this.initDOMEvent = data.hookToDOM;
        }
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
    private initDOMEvent = function (elementSelectionBehaviour: ElementSelectionBehaviour) {
        const elements = elementSelectionBehaviour.getElements();
        elements.off(this.eventType);
        elements.on(
            this.eventType,
            elementSelectionBehaviour.getCallback(this.eventID)
        );
    };
}
