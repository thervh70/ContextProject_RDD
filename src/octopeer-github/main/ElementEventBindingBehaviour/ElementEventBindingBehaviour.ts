/**
 * Created by Youri on 03/05/2016.
 */
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
type EventID = number;
type EventHandler = (eventObject: JQueryEventObject) => void;

interface ElementEventBindingBehaviour {
    getElementId(): ElementID;
    getEventID(): EventID;
    
}
