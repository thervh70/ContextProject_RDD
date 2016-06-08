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
    /** The elements that should be bound to. Stored as fields so that elements are not re-queried every time. */
    private elements: JQuery;

    /**
     * Construct a GenericElementEventBinding, assign the proper values to the field (from the data)
     * and execute the initDOMEvent function
     * @param elementSelectionBehaviour
     * @param data
     */
    constructor(elementSelectionBehaviour: ElementSelectionBehaviour, private data: ElementEventBindingData) {
        this.eventID = data.eventID;
        this.eventType = data.name;
        this.elements = elementSelectionBehaviour.getElements();
        this.removeDOMEvent();
        this.addDOMEvent(elementSelectionBehaviour);
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
    public addDOMEvent(elementSelectionBehaviour: ElementSelectionBehaviour) {
        if (this.data.addDOMEvent === undefined) {
            this.elements.on(
                this.eventType,
                elementSelectionBehaviour.getCallback(this.eventID)
            );
        } else {
            this.data.addDOMEvent(elementSelectionBehaviour);
        }
    };

    /**
     * Make sure the Event is unhooked from the DOM.
     */
    public removeDOMEvent() {
        if (this.data.removeDOMEvent === undefined) {
            this.elements.off(this.eventType);
        } else {
            this.data.removeDOMEvent();
        }
    };
}
