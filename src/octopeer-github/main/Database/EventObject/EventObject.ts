/// <reference path="KeystrokeEvent.ts"/>
/// <reference path="MouseClickEvent.ts"/>
/// <reference path="MousePositionEvent.ts"/>
/// <reference path="MouseScrollEvent.ts"/>
/// <reference path="SemanticEvent.ts"/>
/// <reference path="TabChangeEvent.ts"/>
/// <reference path="WindowResolutionEvent.ts"/>
/**
 * Created by Maarten on 09-06-2016.
 *
 * One universal interface which is a mix of all EventObjects.
 * The type should match the interface name of the data field.
 */
interface EventObject {
    type: string;
    data: EventObjectData;
}

/**
 * An amount of seconds since the Unix Epoch (1-1-1970 0:00).
 */
type UnixTimestamp = number;

/**
 * A union type containing all possible event types. Makes the handling of EventObjects less of a hassle with types.
 */
type EventObjectData = KeystrokeEvent | MouseClickEvent | MousePositionEvent | MouseScrollEvent | SemanticEvent |
                        TabChangeEvent | WindowResolutionEvent;
