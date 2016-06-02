/// <reference path="GenericElementEventBinding.ts"/>
/**
 * Created by Mathias on 2016-06-02.
 * This factory creates GenericElementEventBindings.
 */
class ElementEventBindingFactory {

    /** The list that contains all ElementEventBindingData, used by this esbFactory. */
    private elementEventBindingData: ElementEventBindingData[] = [];

    /**
     * Construct a ElementEventBindingFactory.
     * Place the Data objects in the elementEventBindingDataList array on the index
     * corresponding to the EventID.
     */
    constructor() {
        let data: ElementEventBindingData;

        for (data of elementEventBindingDataList) {
            this.elementEventBindingData[data.eventID.getEventID()] = data;
        }
    }

    /**
     * Find an ElementEventBindingData object that corresponds to the given EventID.
     * @param eventID
     * @returns {ElementEventBindingData}
     */
    public findElementEventBindingData(eventID: EventID) {
        return this.elementEventBindingData[eventID.getEventID()];
    }

    /**
     * Create a GenericElementEventBinding with the proper data.
     * @param elementSelectionBehaviour The ElementSelectionBehaviour that should be bound to the event.
     * @param eventID The event
     * @returns {GenericElementEventBinding} A GenericElementEventBinding
     */
    public create(elementSelectionBehaviour: ElementSelectionBehaviour, eventID: EventID) {
        let data = this.findElementEventBindingData(eventID);
        return new GenericElementEventBinding(elementSelectionBehaviour, data);
    }
}
