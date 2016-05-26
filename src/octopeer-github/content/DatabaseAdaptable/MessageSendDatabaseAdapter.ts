/**
 * Created by Maarten on 17-05-2016.
 */

/**
 * This class implements DatabaseAdaptable in a way that
 * the data is sent to the Chrome Extension Background page.
 * @see ../../main/DatabaseAdaptable/ for more Documentation (copy-pasting is bad, mmkay)
 */
class MessageSendDatabaseAdapter implements DatabaseAdaptable {

    public postSemantic(data: ISemanticEvent, success: Callback, failure: Callback) {
        let postData: any = data;
        postData.elementID = (<ElementID>data.elementID).getElementID();
        postData.eventID = (<EventID>data.eventID).getEventID();
        chrome.runtime.sendMessage(JSON.stringify({data: postData, type: "postSemantic"}));
        success();
    }

    public postKeystroke(data: IKeystrokeEvent, success: Callback, failure: Callback) {
        chrome.runtime.sendMessage(JSON.stringify({data: data, type: "postKeystroke"}));
        success();
    }

    public postMousePosition(data: IMousePositionEvent, success: Callback, failure: Callback) {
        chrome.runtime.sendMessage(JSON.stringify({data: data, type: "postMousePosition"}));
        success();
    }

    public postMouseClick(data: IMouseClickEvent, success: Callback, failure: Callback) {
        chrome.runtime.sendMessage(JSON.stringify({data: data, type: "postMouseClick"}));
        success();
    }

}
