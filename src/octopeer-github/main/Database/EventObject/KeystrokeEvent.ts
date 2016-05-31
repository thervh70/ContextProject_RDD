/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An IKeystrokeEvent contains the data that should be posted to a Database.
 */
interface IKeystrokeEvent {
    keystroke: string;
    timestamp: UnixTimestamp;
}
