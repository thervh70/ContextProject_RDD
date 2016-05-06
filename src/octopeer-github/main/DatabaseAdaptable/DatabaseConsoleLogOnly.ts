/**
 * Created by Youri on 04/05/2016.
 */
/**
 * Semi-mock class for being able to check implementation completeness
 */
class DatabaseConsoleLogOnly implements DatabaseAdaptable {
    /**
     * File invariant logging.
     * @param elementID elementID
     * @param eventID eventID
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
     * @param elementID elementID
     * @param eventID eventID
     * @param filename filename
     * @param lineNumber lineNumber
     * @param start start
     * @param duration duration
     */
    public logWLine(elementID: ElementID, eventID: EventID, filename: FileName, lineNumber: LineNumber, start: Date, duration: Duration) {
        console.log({
            duration: duration,
            elementID: elementID,
            eventID: eventID,
            filename: filename,
            lineNumber: lineNumber,
            start: start,
        });
    }
}
