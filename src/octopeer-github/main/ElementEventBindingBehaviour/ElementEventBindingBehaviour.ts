/**
 * Created by Youri on 03/05/2016.
 */
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
type EventID = number;

interface ElementEventBindingBehaviour {
    getElementId(): ElementID;
    getEventID(): EventID;
    
}
