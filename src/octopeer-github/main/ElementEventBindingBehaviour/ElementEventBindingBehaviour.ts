/**
 * Created by Youri on 03/05/2016.
 */
type EventID = number;
type EventHandler = (eventObject: JQueryEventObject) => void;

interface ElementEventBindingBehaviour {
    getElementId(): ElementID;
    getEventID(): EventID;
    
}
