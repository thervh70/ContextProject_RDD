/// <reference path="../../main/Database/EventObject/EventObject.ts"/>
/**
 * Created by Maarten on 17-05-2016.
 */

/**
 * This class implements DatabaseAdaptable in a way that
 * the data is sent to the Chrome Extension Background page.
 * @see ../../main/DatabaseAdaptable/ for more Documentation (copy-pasting is bad, mmkay)
 */
class MessageSendDatabaseAdapter implements DatabaseAdaptable {

    public post(eventObject: EventObject, success: Callback, failure: Callback) {
        let postData: any = eventObject;
        if (eventObject.type === "SemanticEvent") {
            postData.data.elementID = (<SemanticEvent>eventObject.data).elementID.getElementID();
            postData.data.eventID = (<SemanticEvent>eventObject.data).eventID.getEventID();
        }
        chrome.runtime.sendMessage(JSON.stringify(postData));
        success();
    }

}
