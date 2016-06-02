/// <reference path="GenericElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-31.
 * Used to create GenericElementSelectionBehaviours based on their ElementID.
 */
class ElementSelectionBehaviourFactory {

    /**
     * The ElementSelectionBehaviourData list, sorted by ElementID.
     * Sorting is done in the constructor.
     */
    private elementSelectionBehaviourData: ElementSelectionBehaviourData[] = [];

    /**
     * Create a ElementSelectionBehaviourFactory and puts the ESBData objects at the index
     * corresponding to their ElementID (for easier retrieval of ESBData).
     */
    constructor() {
        let data: ElementSelectionBehaviourData;

        for (data of elementSelectionBehaviourDataList) {
            this.elementSelectionBehaviourData[data.elementID.getElementID()] = data;
        }
    }

    /**
     * Creates a GenericElementSelectionBehaviour by finding the right
     * ElementSelectionBehaviourData and passing this and the database to
     * the GenericElementSelectionBehaviour constructor.
     * @param database The database to be used
     * @param ID The ElementID the data should match
     * @returns {any}
     */
    public create(database: DatabaseAdaptable, ID: ElementID): ElementSelectionBehaviour {
        let elementSelectionBehaviourData = this.findElementSelectionBehaviourData(ID);
        if (elementSelectionBehaviourData != null) {
            return new GenericElementSelectionBehaviour(database, elementSelectionBehaviourData);
        }
        return null;
    }

    /**
     * Find the correct ElementSelectionBehaviourData from the sorted list by ID.
     * @param ID The ID that corresponds with the Data to be found.
     * @returns {any} The Data.
     */
    public findElementSelectionBehaviourData(ID: ElementID) {
        return this.elementSelectionBehaviourData[ID.getElementID()];
    }
}
