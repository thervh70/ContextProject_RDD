/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Unsubscribe setting
 */
class UnsubscribeSettingElementSelectionBehaviour extends SettingElementSelectionBehaviour {

    /**
     * The description of the element, used to determine the element in the DOM-tree
     * @type {string}
     */
    public elementDsc: string = ".js-merge-branch-action";

    /**
     * The ID of the Element
     * @type {ElementID}
     */
    public elementID: ElementID = new ElementID(404);
}
