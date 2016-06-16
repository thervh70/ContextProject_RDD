/// <reference path="../DatabaseAdaptable.ts"/>
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
     * @param filename      (optional) the filename in which an inline event is fired.
     * @param lineNumber    (optional) the line number in which an inline event is fired.
     * @param created_at    the timestamp at which the event was created. Defaults to the current timestamp.
     * @returns {EventObject} A SemanticEvent object that can be posted to the database.
     */
    public static semantic(elementID: ElementID, eventID: EventID,
                           filename?: FileName, lineNumber?: LineNumber, created_at = EventFactory.getTime()): EventObject {
        return {
            data: {created_at: created_at, elementID: elementID, eventID: eventID, filename: filename, lineNumber: lineNumber},
            type: "SemanticEvent",
        };
    }

    /**
     * Creates a KeystrokeEvent object.
     * @param keystroke         the keystroke that is being logged.
     * @param keystroke_type    the type of the keystroke (KEY_DOWN or KEY_UP)
     * @param created_at        the timestamp when the keystroke was logged.
     * @returns {EventObject} A KeystrokeEvent object that can be posted to the database.
     */
    public static keystroke(keystroke: string, keystroke_type: KeystrokeType, created_at = EventFactory.getTime()): EventObject {
        return {
            data: {created_at: created_at, keystroke: keystroke, keystroke_type: keystroke_type},
            type: "KeystrokeEvent",
        };
    }

    /**
     * Creates a KeystrokeEvent object where the keystroke_type is set to KEY_DOWN.
     * @param keystroke         the keystroke that is being logged.
     * @param created_at        the timestamp when the keystroke was logged.
     * @returns {EventObject} A KeystrokeEvent object that can be posted to the database.
     */
    public static keyDown(keystroke: string, created_at = EventFactory.getTime()) {
        return EventFactory.keystroke(keystroke, KeystrokeType.KEY_DOWN, created_at);
    }

    /**
     * Creates a KeystrokeEvent object where the keystroke_type is set to KEY_UP.
     * @param keystroke         the keystroke that is being logged.
     * @param created_at        the timestamp when the keystroke was logged.
     * @returns {EventObject} A KeystrokeEvent object that can be posted to the database.
     */
    public static keyUp(keystroke: string, created_at = EventFactory.getTime()) {
        return EventFactory.keystroke(keystroke, KeystrokeType.KEY_UP, created_at);
    }

    /**
     * Creates a MouseClickEvent object.
     * @param created_at    the timestamp at which the event was created. Defaults to the current timestamp.
     * @returns {EventObject} A MouseClickEvent object that can be posted to the database.
     */
    public static mouseClick(created_at = EventFactory.getTime()): EventObject {
        return {
            data: {created_at: created_at},
            type: "MouseClickEvent",
        };
    }

    /**
     * Creates a MousePositionEvent object.
     * @param position_x    the x-position of the mouse relative to the document.
     * @param position_y    the y-position of the mouse relative to the document.
     * @param viewport_x    the x-position of the mouse relative to the viewport.
     * @param viewport_y    the y-position of the mouse relative to the viewport.
     * @param created_at    the timestamp at which the event was created. Defaults to the current timestamp.
     * @returns {EventObject} A MousePositionEvent object that can be posted to the database.
     */
    public static mousePosition(position_x: number, position_y: number,
                                viewport_x: number, viewport_y: number, created_at = EventFactory.getTime()): EventObject {
        return {
            data: {created_at: created_at, position_x: position_x, position_y: position_y,
                viewport_x: viewport_x, viewport_y: viewport_y},
            type: "MousePositionEvent",
        };
    }

    /**
     * Creates a MouseScrollEvent object.
     * @param viewport_x    the x-position of the mouse relative to the viewport.
     * @param viewport_y    the y-position of the mouse relative to the viewport.
     * @param created_at    the timestamp at which the event was created. Defaults to the current timestamp.
     * @returns {EventObject} A MouseScrollEvent object that can be posted to the database.
     */
    public static mouseScroll(viewport_x: number, viewport_y: number, created_at = EventFactory.getTime()): EventObject {
        return {
            data: {created_at: created_at, viewport_x: viewport_x, viewport_y: viewport_y},
            type: "MouseScrollEvent",
        };
    }

    /**
     * Creates a WindowResolutionEvent object.
     * @param width         the new width of the window.
     * @param height        the new height of the window.
     * @param created_at    the timestamp at which the event was created. Defaults to the current timestamp.
     * @returns {EventObject} A WindowResolutionEvent object that can be posted to the database.
     */
    public static windowResolution(width: number, height: number, created_at = EventFactory.getTime()): EventObject {
        return {
            data: {created_at: created_at, height: height, width: width},
            type: "WindowResolutionEvent",
        };
    }

    /**
     * Creates a HTMLPageEvent object.
     * @param dom           the DOM tree at the moment of the event.\
     * @param created_at    the timestamp at which the event was created. Defaults to the current timestamp.
     * @returns {HTMLPageEvent} A HTMLPageEvent object that can be posted to the database.
     */
    public static htmlPage(dom: string, created_at = EventFactory.getTime()): EventObject {
        return {
            data: {created_at: created_at, dom: dom},
            type: "HTMLPageEvent",
        };
    }

    /**
     * Returns the current timestamp, which is measured in an amount of seconds (with milliseconds in the fractional part)
     * since 1-1-1970 0:00.
     * @returns {UnixTimestamp} the current timestamp.
     */
    public static getTime(): UnixTimestamp {
        return new Date().getTime() / 1000;
    }

}
