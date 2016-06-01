/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A KeystrokeEvent contains the data that should be posted to a Database.
 * @param keystroke     the keystroke that is being logged.
 * @param timestamp     when the event was created.
 */
interface KeystrokeEvent {
    keystroke: string;
    key_down_at: UnixTimestamp;
    key_up_at: UnixTimestamp;
}
