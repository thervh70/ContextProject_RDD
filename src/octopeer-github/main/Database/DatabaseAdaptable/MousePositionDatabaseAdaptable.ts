/// <reference path="../EventObject/MousePositionEvent.ts"/>
/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A MousePositionDatabaseAdaptable should implement a method that posts to any real-life database.
 * @param eventData     The data to post to the database.
 * @param success       Callback, which is called once the call has succeeded.
 * @param failure       Callback, which is called once the call has failed.
 */
interface MousePositionDatabaseAdaptable {
    postMousePosition(eventData: IMousePositionEvent, success: Callback, failure: Callback): void;
}
