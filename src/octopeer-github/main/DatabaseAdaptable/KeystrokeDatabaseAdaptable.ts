/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * A DatabaseAdaptable should implement a `post` method that posts to any database.
 * @param eventData     The data to post to the database.
 * @param success       Callback, which is called once the call has succeeded.
 * @param failure       Callback, which is called once the call has failed.
 */
interface KeystrokeDatabaseAdaptable {
    postSemantic(eventData: ISemanticEvent, success: Callback, failure: Callback): void;
}
