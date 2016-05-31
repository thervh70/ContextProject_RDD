/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An IMouseScrollEvent contains the data that should be posted to a Database.
 */
interface IMouseScrollEvent {
    /** The viewport_x and viewport_y indicate the current viewport. */
    viewport_x: number;
    viewport_y: number;

    timestamp: UnixTimestamp;
}
