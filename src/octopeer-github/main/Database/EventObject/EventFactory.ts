/**
 * Created by Maarten on 31-05-2016.
 *
 * The utility class EventFactory can create the different EventObjects.
 * It seems redundant to have this, since TypeScript can infer an interface on any anonymous object.
 * However, so is stating the fieldnames of the objects every time a new EventObject is created.
 * These factory methods allow EventObjects to be instantiated based on an ordered tuple (parameter list) instead.
 */
abstract class EventFactory {

    /**
     * Creates a SemanticEvent object.
     * @param elementID     the ElementID that is being tracked.
     * @param eventID       the EventID that is being tracked.
     * @param start         the start of the event.
     * @param duration      the duration of the event.
     * @param filename      (optional) the filename in which an inline event is fired.
     * @param lineNumber    (optional) the line number in which an inline event is fired.
     * @returns {SemanticEvent} A SemanticEvent object that can be posted to the database.
     */
    public static semantic(elementID: ElementID, eventID: EventID, start: UnixTimestamp, duration: Duration,
                           filename?: FileName, lineNumber?: LineNumber): SemanticEvent {
        return {duration: duration, elementID: elementID, eventID: eventID, filename: filename,
                lineNumber: lineNumber, start: start};
    }

    /**
     * Creates a KeystrokeEvent object.
     * @param keystroke     the keystroke that is being logged.
     * @param timestamp     the timestamp of the event.
     * @returns {KeystrokeEvent} A KeystrokeEvent object that can be posted to the database.
     */
    public static keystroke(keystroke: string, timestamp: UnixTimestamp): KeystrokeEvent {
        return {keystroke: keystroke, timestamp: timestamp};
    }

    /**
     * Creates a MouseClickEvent object.
     * @param timestamp     the timestamp of the event.
     * @returns {MouseClickEvent} A MouseClickEvent object that can be posted to the database.
     */
    public static mouseClick(timestamp: UnixTimestamp): MouseClickEvent {
        return {timestamp: timestamp};
    }

    /**
     * Creates a MousePositionEvent object.
     * @param position_x    the x-position of the mouse relative to the document.
     * @param position_y    the y-position of the mouse relative to the document.
     * @param viewport_x    the x-position of the mouse relative to the viewport.
     * @param viewport_y    the y-position of the mouse relative to the viewport.
     * @param timestamp     the timestamp of the event.
     * @returns {MousePositionEvent} A MousePositionEvent object that can be posted to the database.
     */
    public static mousePosition(position_x: number, position_y: number,
                                viewport_x: number, viewport_y: number, timestamp: UnixTimestamp): MousePositionEvent {
        return {position_x: position_x, position_y: position_y, timestamp: timestamp,
                viewport_x: viewport_x, viewport_y: viewport_y};
    }

    /**
     * Creates a MouseScrollEvent object.
     * @param viewport_x    the x-position of the mouse relative to the viewport.
     * @param viewport_y    the y-position of the mouse relative to the viewport.
     * @param timestamp     the timestamp of the event.
     * @returns {MouseScrollEvent} A MouseScrollEvent object that can be posted to the database.
     */
    public static mouseScroll(viewport_x: number, viewport_y: number, timestamp: UnixTimestamp): MouseScrollEvent {
        return {timestamp: timestamp, viewport_x: viewport_x, viewport_y: viewport_y};
    }

    /**
     * Creates a WindowResolutionEvent object.
     * @param width         the new width of the window.
     * @param height        the new height of the window.
     * @param timestamp     the timestamp of the event.
     * @returns {WindowResolutionEvent} A WindowResolutionEvent object that can be posted to the database.
     */
    public static windowResolution(width: number, height: number, timestamp: UnixTimestamp): WindowResolutionEvent {
        return {height: height, timestamp: timestamp, width: width};
    }

}
