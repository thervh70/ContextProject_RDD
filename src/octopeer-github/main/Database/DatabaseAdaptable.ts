/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * The Callback type can be used in implementing classes to allow for a callback on success or failure.
 * Using EMPTY_CALLBACK means you explicitly specify that nothing should happen on success or failure.
 */
type Callback = JQueryPromiseCallback<any>;

// tslint:disable-next-line:no-unused-variable
const EMPTY_CALLBACK: Callback = function() {return; };

/**
 * An amount of seconds since the Unix Epoch (1-1-1970 0:00).
 * Since this type is used by all DatabaseAdaptables, I think the typedef belongs to this file.
 */
type UnixTimestamp = number;

/**
 * A DatabaseAdaptable should implement a method that posts to any real-life database.
 * @param eventData     The data to post to the database.
 * @param success       Callback, which is called once the call has succeeded.
 * @param failure       Callback, which is called once the call has failed.
 */
interface DatabaseAdaptable {
    post(eventData: EventObject, success: Callback, failure: Callback): void;
}
