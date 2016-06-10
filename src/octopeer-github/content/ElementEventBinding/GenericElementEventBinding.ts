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
     * @param elementSelectionBehaviour the elementSelectionBehaviour to use for its elements and callback
     * @param data an element from the EEBData list
     * @deprecated Use the EEBFactory to construct new GenericElementEventBindings.
     */
    constructor(private elementSelectionBehaviour: ElementSelectionBehaviour, private data: ElementEventBindingData) {
        this.eventID = data.eventID;
        this.eventType = data.name;
        this.checkOverrides();
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
    public addDOMEvent(elementSelectionBehaviour: ElementSelectionBehaviour = this.elementSelectionBehaviour) {
        this.data.addDOMEvent(elementSelectionBehaviour);
    };

    /**
     * Make sure the Event is unhooked from the DOM.
     */
    public removeDOMEvent(elementSelectionBehaviour: ElementSelectionBehaviour = this.elementSelectionBehaviour) {
        this.data.removeDOMEvent(elementSelectionBehaviour);
    };

    /**
     * Checks whether the data object has both overrides.
     * It sets the default behaviour for addDOMEvent and removeDOMEvent if this is not the case.
     */
    private checkOverrides() {
        if (!this.hasBothOverrides()) {
            this.data.addDOMEvent = (esb: ElementSelectionBehaviour) => {
                esb.getElements().on(this.eventType, esb.getCallback(this.eventID));
            };
            this.data.removeDOMEvent = (esb: ElementSelectionBehaviour) => {
                esb.getElements().off(this.eventType);
            };
        }
    }

    /**
     * @returns {boolean} true when both overrides are provided in the data object, false otherwise.
     */
    private hasBothOverrides() {
        return this.data.addDOMEvent !== undefined && this.data.removeDOMEvent !== undefined;
    }

}
