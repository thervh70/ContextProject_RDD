/// <reference path="../ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../Types/ElementID.ts"/>
/// <reference path="../Types/EventID.ts"/>

/**
 * Created by Youri on 04/05/2016.
 */
type Duration = number;
type FileName = string;
type LineNumber = number;
type Callback = JQueryPromiseCallback<any>;

const EMPTY_CALLBACK = function() {return; };
EMPTY_CALLBACK(); // suppress TSLint unused-variable, because it is used elsewhere

interface DatabaseAdaptable {
    post(data: EventObject, success: Callback, failure: Callback): void;
}

interface EventObject {
    elementID: ElementID;
    eventID: EventID;
    start: Date;
    duration: Duration;
    filename?: FileName;
    lineNumber?: LineNumber;
}

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
