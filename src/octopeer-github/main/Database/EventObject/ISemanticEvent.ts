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
 * An ISemanticEvent contains the data that should be posted to a Database.
 */
interface ISemanticEvent {
    elementID: ElementID;
    eventID: EventID;
    start: UnixTimestamp;
    duration: Duration;
    filename?: FileName;
    lineNumber?: LineNumber;
}
