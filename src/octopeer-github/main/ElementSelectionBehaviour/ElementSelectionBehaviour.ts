/**
 * Created by Youri on 03/05/2016.
 */
type ElementID = number;

interface ElementSelectionBehaviour {
    getElementId(): ElementID;
    getElements(): JQuery;
}
