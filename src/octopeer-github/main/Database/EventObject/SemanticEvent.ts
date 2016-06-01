/**
 * Created by Maarten on 24-05-2016.
 */

/** An amount of milliseconds. */
type Duration = number;
/** The name of a file in the repository. */
type FileName = string;
/** A line number in a file. */
type LineNumber = number;

/**
 * An SemanticEvent contains the data that should be posted to a Database.
 * @param elementID     the ID of the element being tracked.
 * @param eventID       the ID of the event being tracked.
 * @param start         when the event was created.
 * @param duration      the duration of the event.
 * @param filename      the name of the file in inline tracking.
 * @param lineNumber    the linenumber in the file in inline tracking.
 */
interface SemanticEvent {
    elementID: ElementID;
    eventID: EventID;
    start: UnixTimestamp;
    duration: Duration;
    filename?: FileName;
    lineNumber?: LineNumber;
}