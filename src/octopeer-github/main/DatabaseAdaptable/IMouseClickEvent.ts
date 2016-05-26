/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An IKeystrokeEvent contains the data that should be posted to a Database.
 */
interface IMouseClickEvent {
    timestamp: UnixTimestamp;
}

/**
 * A constructor has been provided. This does not have to be used for something to be an IMouseClickEvent however.
 * TypeScript can infer types, so any object with the correct fields is seen as an IMouseClickEvent.
 */
class MouseClickEvent implements IMouseClickEvent {
    constructor(public timestamp: UnixTimestamp) { }
}
