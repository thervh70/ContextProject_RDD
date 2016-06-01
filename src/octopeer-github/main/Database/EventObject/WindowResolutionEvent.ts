/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A WindowResolutionEvent contains the data that should be posted to a Database.
 * @param width         the new width of the window.
 * @param height        the new height of the window.
 * @param timestamp     when the event was created.
 */
interface WindowResolutionEvent {
    /** The width and height of the new size of the viewport. */
    width: number;
    height: number;

    created_at: UnixTimestamp;
}
