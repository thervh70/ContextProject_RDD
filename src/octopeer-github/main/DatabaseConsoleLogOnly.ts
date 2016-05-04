/**
 * Created by Youri on 04/05/2016.
 */
/**
 * Semi-mock class for being able to check implementation completeness
 */
class DatabaseConsoleLogOnly implements DatabaseAdapterInterface {
    /**
     * File invariant logging.
     * @param elementID elementid
     * @param eventID eventid
     * @param start start
     * @param duration duration
     */
    public log(elementID: ElementID, eventID: EventID, start: Date, duration: Duration) {
        console.log({
            duration: duration,
            elementID: elementID,
            eventID: eventID,
            start: start,
        });
    }

    /**
     * File identifying logging.
     * @param elementID elementid
     * @param eventID eventid
     * @param filename filename
     * @param linenumber linenumber
     * @param start start
     * @param duration duration
     */
    public logWLine(elementID: ElementID, eventID: EventID, filename: FileName, linenumber: LineNumber, start: Date, duration: Duration) {
        console.log({
            duration: duration,
            elementID: elementID,
            eventID: eventID,
            filename: filename,
            linenumber: linenumber,
            start: start,
        });
    }
}
