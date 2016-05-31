/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-26.
 */
class KeystrokeTracker {

    /**
     * Initialize a KeystrokeTracker that contains a KeystrokeDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: KeystrokeDatabaseAdaptable) {
        const self = this;
        const bodyObject = $("body");
        bodyObject.off("keypress");
        bodyObject.on("keypress", function (eventObject: JQueryEventObject) {
            self.db.postKeystroke(EventFactory.keystroke(String.fromCharCode(eventObject.which),
                // TODO: key_down_at and key_up_at should be set correctly.
                EventFactory.getTime(), EventFactory.getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }
}
