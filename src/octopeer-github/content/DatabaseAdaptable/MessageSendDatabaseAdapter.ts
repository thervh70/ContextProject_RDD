/**
 * Created by Maarten on 17-05-2016.
 */

/**
 * This class implements DatabaseAdaptable in a way that
 * the data is sent to the Chrome Extension Background page.
 */
class MessageSendDatabaseAdapter implements DatabaseAdaptable {

    /**
     * @see ../../main/DatabaseAdaptable
     */
    public post(data: IEventObject, success: Callback, failure: Callback) {
        let postData: any = data;
        postData.elementID = (<ElementID>data.elementID).getElementID();
        postData.eventID = (<EventID>data.eventID).getEventID();
        chrome.runtime.sendMessage(JSON.stringify(postData));
        success();
    }

}
