/**
 * Created by Youri on 04/05/2016.
 */
type Duration = number;
type FileName = string;
type LineNumber = number;

interface DatabaseAdapterInterface {
    log(elementID: ElementID, eventID: EventID, start: Date, duration: Duration): void;
    log(elementID: ElementID, eventID: EventID, filename: FileName, linenumber: LineNumber, start: Date, duration: Duration): void;
}
