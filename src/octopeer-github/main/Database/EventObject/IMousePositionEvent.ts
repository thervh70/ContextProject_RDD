/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An IMousePositionEvent contains the data that should be posted to a Database.
 */
interface IMousePositionEvent {
    /** position_x and position_y specify the position on the page (i.e. relative to the top-left corner of the document). */
    position_x: number;
    position_y: number;
    /** viewport_x and viewport_y specify the position on the viewport (i.e. relative to the top-left corner of the window). */
    viewport_x: number;
    viewport_y: number;

    timestamp: UnixTimestamp;
}

/**
 * A constructor has been provided. This does not have to be used for something to be an IMousePositionEvent however.
 * TypeScript can infer types, so any object with the correct fields is seen as an IMousePositionEvent.
 */
class MousePositionEvent implements IMousePositionEvent {
    constructor(public position_x: number, public position_y: number,
                public viewport_x: number, public viewport_y: number, public timestamp: UnixTimestamp) { }
}
