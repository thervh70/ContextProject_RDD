/**
 * Created by Youri on 08/05/2016.
 */
/**
 * Class to hold elementID's so they can be a semantically different data type.
 */
class ElementID {
    /**
     * Create a new ElementID object.
     * @param elementID the element id to hold.
     */
    constructor(private elementID: number) {}

    /**
     * Get the value of the element ID.
     * @returns {number}
     */
    public getElementID(): number {
        return this.elementID;
    }

    /**
     * @returns {string} A string containing only the elementID.
     */
    public toString(): string {
        return `${this.elementID}`;
    }
}
