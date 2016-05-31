/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A KeystrokeEvent contains the data that should be posted to a Database.
 */
interface KeystrokeEvent {
    keystroke: string;
    key_down_at: UnixTimestamp;
    key_up_at: UnixTimestamp;
}
