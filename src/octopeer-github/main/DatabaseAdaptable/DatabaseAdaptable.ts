/// <reference path="../ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../ElementID.ts"/>
/// <reference path="../EventID.ts"/>

/**
 * Created by Youri on 04/05/2016.
 */
type Duration = number;
type FileName = string;
type LineNumber = number;
type Callback = JQueryPromiseCallback<any>;

const EMPTY_CALLBACK = function() {return; };
EMPTY_CALLBACK(); // suppress TSLint unused-variable

interface DatabaseAdaptable {

    log(elementID: ElementID, eventID: EventID,
        start: Date, duration: Duration,
        success: Callback, failure: Callback): void;

    logWLine(elementID: ElementID, eventID: EventID,
             filename: FileName, linenumber: LineNumber,
             start: Date, duration: Duration,
             success: Callback, failure: Callback): void;
}
