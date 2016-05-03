/**
 * Created by Youri on 03/05/2016.
 */
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
type ElementID = number;

interface ElementSelectionBehaviour {
    getElementId(): ElementID;
    getElements(): JQuery;
}
