/**
 * Created by Maarten on 24-05-2016.
 */

type Duration = number;
type FileName = string;
type LineNumber = number;

/**
 * An IEventObject contains the data that should be posted to a Database.
 */
interface IEventObject {
    elementID: ElementID;
    eventID: EventID;
    start: Date;
    duration: Duration;
    filename?: FileName;
    lineNumber?: LineNumber;
}

/**
 * A short-hand method to create an IEventObject.
 */
class EventObject implements IEventObject {
    constructor(public elementID: ElementID, public eventID: EventID,
                public start: Date, public duration: Duration,
                public filename?: FileName, public lineNumber?: LineNumber) { }
}
