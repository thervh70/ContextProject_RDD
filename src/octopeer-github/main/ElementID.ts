/**
 * Created by Youri on 08/05/2016.
 */
/**
 * Class to hold elementID's so they can be a semanticaly different datatype.
 */
class ElementID {
    /**
     * Create a new ElementID object.
     * @param elementID the element id to hold.
     */
    constructor(private elementID: number) {}

    /**
     * get the value of the element ID.
     * @returns {number}
     */
    public getElementID(): number {
        return this.elementID;
    }
}
