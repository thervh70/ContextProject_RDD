/// <reference path="../EventObject/SemanticEvent.ts"/>

/**
 * Created by Youri on 04/05/2016.
 */

/**
 * A SemanticDatabaseAdaptable should implement a method that posts to any real-life database.
 * @param eventData     The data to post to the database.
 * @param success       Callback, which is called once the call has succeeded.
 * @param failure       Callback, which is called once the call has failed.
 */
interface SemanticDatabaseAdaptable {
    postSemantic(eventData: ISemanticEvent, success: Callback, failure: Callback): void;
}
