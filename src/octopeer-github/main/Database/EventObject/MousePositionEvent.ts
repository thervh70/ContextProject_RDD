/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A MousePositionEvent contains the data that should be posted to a Database.
 * @param position_x    specifies the x-position on the page (i.e. relative to the top-left corner of the document).
 * @param position_y    specifies the y-position on the page (i.e. relative to the top-left corner of the document).
 * @param viewport_x    specifies the x-position on the viewport (i.e. relative to the top-left corner of the window).
 * @param viewport_y    specifies the y-position on the viewport (i.e. relative to the top-left corner of the window).
 * @param timestamp     when the event was created.
 */
interface MousePositionEvent {
    position_x: number;
    position_y: number;

    viewport_x: number;
    viewport_y: number;

    created_at: UnixTimestamp;
}
