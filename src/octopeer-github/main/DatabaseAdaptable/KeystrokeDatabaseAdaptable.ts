/// <reference path="IKeystrokeEvent.ts"/>
/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A KeystrokeDatabaseAdaptable should implement a method that posts to any real-life database.
 * @param eventData     The data to post to the database.
 * @param success       Callback, which is called once the call has succeeded.
 * @param failure       Callback, which is called once the call has failed.
 */
interface KeystrokeDatabaseAdaptable {
    postKeystroke(eventData: IKeystrokeEvent, success: Callback, failure: Callback): void;
}
