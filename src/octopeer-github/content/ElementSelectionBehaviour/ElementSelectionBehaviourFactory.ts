/// <reference path="GenericElementSelectionBehaviour.ts"/>
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
        let elementSelectionBehaviourData = this.findElementSelectionBehaviourData(ID);
        if (elementSelectionBehaviourData != null) {
            return new GenericElementSelectionBehaviour(database, elementSelectionBehaviourData);
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
     * Find the correct ElementSelectionBehaviourData from the sorted list by ID.
     * @param ID The ID that corresponds with the Data to be found.
     * @returns {any} The Data, or null if not present in the sorted list.
     */
    public findElementSelectionBehaviourData(ID: ElementID) {
        let elementSelectionBehaviourData: ElementSelectionBehaviourData;

        for (elementSelectionBehaviourData of this.elementSelectionBehaviourData) {
            if (elementSelectionBehaviourData.elementID.getElementID() === ID.getElementID()) {
                return elementSelectionBehaviourData;
            }
        }
        return null;
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
