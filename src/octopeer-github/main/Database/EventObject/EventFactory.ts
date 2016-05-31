/**
 * Created by Maarten on 31-05-2016.
 *
 * The utility class EventFactory can create the different EventObjects.
 * It seems redundant to have this, since TypeScript can infer an interface on any anonymous object.
 * However, so is stating the fieldnames of the objects every time a new EventObject is created.
 * These factory methods allow EventObjects to be instantiated based on an ordered tuple (parameter list) instead.
 */
abstract class EventFactory {

    public static semantic(elementID: ElementID, eventID: EventID, start: UnixTimestamp, duration: Duration,
                           filename?: FileName, lineNumber?: LineNumber) {
        return {duration: duration, elementID: elementID, eventID: eventID, filename: filename,
                lineNumber: lineNumber, start: start};
    }

    public static keystroke(keystroke: string, timestamp: UnixTimestamp) {
        return {keystroke: keystroke, timestamp: timestamp};
    }

    public static mouseClick(timestamp: UnixTimestamp) {
        return {timestamp: timestamp};
    }

    public static mousePosition(position_x: number, position_y: number,
                                viewport_x: number, viewport_y: number, timestamp: UnixTimestamp) {
        return {position_x: position_x, position_y: position_y, timestamp: timestamp,
                viewport_x: viewport_x, viewport_y: viewport_y};
    }

    public static mouseScroll(viewport_x: number, viewport_y: number, timestamp: UnixTimestamp) {
        return {timestamp: timestamp, viewport_x: viewport_x, viewport_y: viewport_y};
    }

    public static windowResolution(width: number, height: number, timestamp: UnixTimestamp) {
        return {height: height, timestamp: timestamp, width: width};
    }

}
