/**
 * Created by Youri on 03/05/2016.
 */
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="ElementSelectionBehaviour.ts"/>

class SelectButtonsElementSelectionBehaviour implements ElementSelectionBehaviour {
    getElementId() {
        return 1;
    }
    getElements() {
        return $('.button');
    }
}
