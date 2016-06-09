/// <reference path="KeystrokeEvent.ts"/>
/// <reference path="MouseClickEvent.ts"/>
/// <reference path="MousePositionEvent.ts"/>
/// <reference path="MouseScrollEvent.ts"/>
/// <reference path="SemanticEvent.ts"/>
/// <reference path="WindowResolutionEvent.ts"/>
/**
 * Created by Maarten on 09-06-2016.
 *
 * One universal interface which is a mix of all EventObjects.
 * The type should match the interface name of the data field.
 */
interface EventObject {
    type: string;
    data: KeystrokeEvent | MouseClickEvent | MousePositionEvent | MouseScrollEvent | SemanticEvent | WindowResolutionEvent;
}
