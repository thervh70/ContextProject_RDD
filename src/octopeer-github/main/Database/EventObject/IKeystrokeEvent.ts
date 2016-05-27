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

/**
 * A constructor has been provided. This does not have to be used for something to be an IKeystrokeEvent however.
 * TypeScript can infer types, so any object with the correct fields is seen as an IKeystrokeEvent.
 */
class KeystrokeEvent implements IKeystrokeEvent {
    constructor(public keystroke: string, public timestamp: UnixTimestamp) { }
}
