/**
 * Created by Maarten on 24-05-2016.
 */

/** The name of a file in the repository. */
type FileName = string;
/** A line number in a file. */
type LineNumber = number;

/**
 * A SemanticEvent contains the data that should be posted to a Database.
 * @param elementID     the ID of the element being tracked.
 * @param eventID       the ID of the event being tracked.
 * @param start         when the event was created.
 * @param duration      the duration of the event.
 * @param filename      the name of the file in inline tracking.
 * @param lineNumber    the linenumber in the file in inline tracking.
 * @param created_at    when the event was created.
 */
interface SemanticEvent {
    elementID: ElementID;
    eventID: EventID;

    filename?: FileName;
    lineNumber?: LineNumber;

    created_at: UnixTimestamp;
}
