/// <reference path="IEventObject.ts"/>

/**
 * Created by Youri on 04/05/2016.
 */
type Callback = JQueryPromiseCallback<any>;

const EMPTY_CALLBACK = function() {return; };
EMPTY_CALLBACK(); // suppress TSLint unused-variable, because it is used elsewhere

/**
 * A DatabaseAdaptable should implement a `post` method that posts to any database.
 * @param eventData     The data to post to the database.
 * @param success       Callback, which is called once the call has succeeded.
 * @param failure       Callback, which is called once the call has failed.
 */
interface DatabaseAdaptable {
    post(eventData: IEventObject, success: Callback, failure: Callback): void;
}
