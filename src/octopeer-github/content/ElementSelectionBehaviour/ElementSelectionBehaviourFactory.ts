/**
 * Created by Mathias on 2016-05-31.
 */
class ElementSelectionBehaviourFactory {

    /**
     * The ElementSelectionBehaviourData list, sorted by ElementID.
     * Sorting is done in the constructor.
     */
    private elementSelectionBehaviourData: ElementSelectionBehaviourData[];

    /**
     * Create a ElementSelectionBehaviourFactory and sort the ElementSelectionBehaviourData list.
     */
    constructor() {
        this.elementSelectionBehaviourData = unsortedElementSelectionBehaviourData.sort(this.compare);
    }

    /**
     * Creates a GenericElementSelectionBehaviour by finding the right
     * ElementSelectionBehaviourData and passing this and the database to
     * the GenericElementSelectionBehaviour constructor.
     * @param database The database to be used
     * @param ID The ElementID the data should match
     * @returns {any}
     */
    public create(database: DatabaseAdaptable, ID: ElementID) {
        let data: ElementSelectionBehaviourData;

        for (data of this.elementSelectionBehaviourData) {
            if (data.elementID === ID) {
                return new GenericElementSelectionBehaviour(database, data);
            }
        }
        return null;
    }

    /**
     * Get the sorted ElementSelectionBehaviourData list
     * @returns {ElementSelectionBehaviourData[]}
     */
    public getElementSelectionBehaviourData() {
        return this.elementSelectionBehaviourData;
    }

    /**
     * Compare two ElementSelectionBehaviourDatas by ElementID.
     * Used to sort the ElementSelectionBehaviourData list.
     * @param esb1 The first ElementSelectionBehaviourData
     * @param esb2 The second ElementSelectionBehaviourData.
     * @returns {number}
     */
    private compare(esb1: ElementSelectionBehaviourData, esb2: ElementSelectionBehaviourData) {
        return esb1.elementID.getElementID() - esb2.elementID.getElementID();
    }
}
