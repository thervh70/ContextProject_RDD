/// <reference path="GenericElementEventBinding.ts"/>
/**
 * Created by Mathias on 2016-06-02.
 */
class ElementEventBindingFactory {

    /** The list that contains all ElementEventBindingData, used by this esbFactory. */
    private elementEventBindingData: ElementEventBindingData[] = [];

    /**
     * Construct a ElementEventBindingFactory.
     * Place the Data objects in the elementEventBindingData array on the index
     * corresponding to the EventID.
     */
    constructor() {
        let data: ElementEventBindingData;

        for (data of elementEventBindingData) {
            this.elementEventBindingData[data.eventID.getEventID()] = data;
        }
    }

    /**
     * Find an ElementEventBindingData object that corresponds to the given EventID.
     * @param eventID
     * @returns {ElementEventBindingData}
     */
    public findElementEventBindingData(eventID: EventID) {
        return elementEventBindingData[eventID.getEventID()];
    }

    /**
     * Create a GenericElementEventBinding with the proper data.
     * @param elementSelectionBehaviour The ElementSelectionBehaviour that should be bound to the event.
     * @param eventID The event
     * @returns {GenericElementEventBinding} A GenericElementEventBinding
     */
    public create(elementSelectionBehaviour: GenericElementSelectionBehaviour, eventID: EventID) {
        let data = this.findElementEventBindingData(eventID);
        return new GenericElementEventBinding(elementSelectionBehaviour, data);
    }
}
