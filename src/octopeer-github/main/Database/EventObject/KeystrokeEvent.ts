/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A set of constants used for defining keystroke types.
 */
// tslint:disable-next-line:no-unused-variable
const KeystrokeType = {
    KEY_DOWN: 1,
    KEY_UP: 2,
};
type KeystrokeType = number;

/**
 * A KeystrokeEvent contains the data that should be posted to a Database.
 * @param keystroke     the keystroke that is being logged.
 * @param created_at    when the event was created.
 */
interface KeystrokeEvent {
    keystroke: string;
    keystroke_type: KeystrokeType;
    created_at: UnixTimestamp;
}
