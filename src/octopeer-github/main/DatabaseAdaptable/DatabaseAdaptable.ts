/**
 * Created by Youri on 04/05/2016.
 */
type Duration = number;
type FileName = string;
type LineNumber = number;
type Callback = JQueryPromiseCallback<any>;

const EMPTY_CALLBACK = function() {return; };
EMPTY_CALLBACK(); // suppress TSLint unused-variable, because it is used elsewhere

/**
 * A DatabaseAdaptable should implement a `post` method that posts to any database.
 */
interface DatabaseAdaptable {
    post(data: EventObject, success: Callback, failure: Callback): void;
}

/**
 * An EventObject contains the data that should be posted to a Database.
 */
interface EventObject {
    elementID: ElementID;
    eventID: EventID;
    start: Date;
    duration: Duration;
    filename?: FileName;
    lineNumber?: LineNumber;
}

/**
 * A short-hand method to create an EventObject.
 */
function EventObject(elementID: ElementID, eventID: EventID,
    start: Date, duration: Duration,
    filename?: FileName, lineNumber?: LineNumber): EventObject {
    return {
        duration: duration,
        elementID: elementID,
        eventID: eventID,
        filename: filename,
        lineNumber: lineNumber,
        start: start,
    };
}
// suppress TSLint unused-variable, because it is used elsewhere
EventObject(new ElementID(0), new EventID(0), new Date(), 0);
