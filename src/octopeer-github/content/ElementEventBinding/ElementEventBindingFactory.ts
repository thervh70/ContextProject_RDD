/**
 * Created by Mathias on 2016-06-02.
 */
class ElementEventBindingFactory {

    /** The list that contains all ElementEventBindingData, used by this factory. */
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
}
