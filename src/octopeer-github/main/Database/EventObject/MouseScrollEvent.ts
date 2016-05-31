/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An MouseScrollEvent contains the data that should be posted to a Database.
 */
interface MouseScrollEvent {
    /** The viewport_x and viewport_y indicate the current viewport. */
    viewport_x: number;
    viewport_y: number;

    created_at: UnixTimestamp;
}
