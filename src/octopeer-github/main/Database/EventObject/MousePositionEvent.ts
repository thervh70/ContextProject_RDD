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
