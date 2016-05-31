/**
 * Created by Mathias on 30-05-2016.
 * This interface enforces the
 */
interface ElementSelectionBehaviourData {
    elementID: ElementID;
    name: string;
    selector: string;
    composedSelector?: () => JQuery;
    foundOnPages: PageMask;
    callback?: (event: JQueryEventObject) => void;
}
