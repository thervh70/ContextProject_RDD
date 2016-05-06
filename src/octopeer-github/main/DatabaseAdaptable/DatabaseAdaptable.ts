/// <reference path="../ElementEventBinding/ElementEventBinding.ts"/>

/**
 * Created by Youri on 04/05/2016.
 */
type Duration = number;
type FileName = string;
type LineNumber = number;

const EMPTY_CALLBACK = function() {return; };
EMPTY_CALLBACK(); // suppress TSLint unused-variable

interface DatabaseAdaptable {

    log(elementID: ElementID, eventID: EventID,
        start: Date, duration: Duration,
        success: JQueryPromiseCallback<any>, failure: JQueryPromiseCallback<any>): void;

    logWLine(elementID: ElementID, eventID: EventID,
             filename: FileName, linenumber: LineNumber,
             start: Date, duration: Duration,
             success: JQueryPromiseCallback<any>, failure: JQueryPromiseCallback<any>): void;
}
