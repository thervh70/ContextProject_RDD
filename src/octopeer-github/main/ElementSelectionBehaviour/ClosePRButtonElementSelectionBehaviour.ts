/**
 * Created by Mathias on 2016-05-11.
 */
class ClosePRButtonElementSelectionBehaviour extends ButtonElementSelectionBehaviour {

    /**
     * The description of the element, used to determine the element in the DOM-tree
     * @type {string}
     */
    public elementDsc: string = ".btn";

    /**
     * The ID of the Element
     * @type {ElementID}
     */
    public elementID: ElementID = new ElementID(2);
}
