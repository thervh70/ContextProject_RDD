/**
 * Created by Maarten on 24-05-2016.
 */

/** The name of a file in the repository. */
type FileName = string;
/** A line number in a file. */
type LineNumber = number;

/**
 * An SemanticEvent contains the data that should be posted to a Database.
 */
interface SemanticEvent {
    elementID: ElementID;
    eventID: EventID;

    filename?: FileName;
    lineNumber?: LineNumber;

    created_at: UnixTimestamp;
}
