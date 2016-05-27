/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * An IMouseScrollEvent contains the data that should be posted to a Database.
 */
interface IMouseScrollEvent {
    /** The viewport_x and viewport_y indicate the difference in viewport. */
    viewport_x: number;
    viewport_y: number;

    timestamp: UnixTimestamp;
}

/**
 * A constructor has been provided. This does not have to be used for something to be an IMouseScrollEvent however.
 * TypeScript can infer types, so any object with the correct fields is seen as an IMouseScrollEvent.
 */
class MouseScrollEvent implements IMouseScrollEvent {
    constructor(public viewport_x: number, public viewport_y: number, public timestamp: UnixTimestamp) { }
}
