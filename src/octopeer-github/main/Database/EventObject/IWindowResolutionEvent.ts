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

/**
 * A constructor has been provided. This does not have to be used for something to be an IWindowResolutionEvent however.
 * TypeScript can infer types, so any object with the correct fields is seen as an IWindowResolutionEvent.
 */
class WindowResolutionEvent implements IWindowResolutionEvent {
    constructor(public width: number, public height: number, public timestamp: UnixTimestamp) { }
}
