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
     * Create is used to create a GenericElementSelectionBehaviour.
     */
    public create() {
        return;
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
