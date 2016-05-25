/**
 * Created by Maarten on 24-05-2016.
 */

type UnixTimestamp = number;
type Duration = number;
type FileName = string;
type LineNumber = number;

/**
 * An IEventObject contains the data that should be posted to a Database.
 */
interface IEventObject {
    elementID: ElementID;
    eventID: EventID;
    start: UnixTimestamp;
    duration: Duration;
    filename?: FileName;
    lineNumber?: LineNumber;
}

/**
 * A constructor has been provided. This does not have to be used for something to be an IEventObject however.
 * TypeScript can infer types, so any object with the correct fields is seen as an IEventObject.
 */
class EventObject implements IEventObject {
    constructor(public elementID: ElementID, public eventID: EventID,
                public start: UnixTimestamp, public duration: Duration,
                public filename?: FileName, public lineNumber?: LineNumber) { }
}
