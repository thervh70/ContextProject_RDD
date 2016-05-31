/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A KeystrokeEvent contains the data that should be posted to a Database.
 */
interface KeystrokeEvent {
    keystroke: string;
    timestamp: UnixTimestamp;
}
