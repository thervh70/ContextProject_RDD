/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An IWindowResolutionEvent contains the data that should be posted to a Database.
 */
interface IWindowResolutionEvent {
    /** The width and height of the new size of the viewport. */
    width: number;
    height: number;

    timestamp: UnixTimestamp;
}
