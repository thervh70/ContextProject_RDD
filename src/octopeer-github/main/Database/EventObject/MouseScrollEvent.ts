/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An MouseScrollEvent contains the data that should be posted to a Database.
 * @param viewport_x    indicates the x-position of the current viewport.
 * @param viewport_y    indicates the y-position of the current viewport.
 * @param timestamp     when the event was created.
 */
interface MouseScrollEvent {
    viewport_x: number;
    viewport_y: number;

    timestamp: UnixTimestamp;
}