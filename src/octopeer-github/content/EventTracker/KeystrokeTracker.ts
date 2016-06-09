/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-26.
 */
class KeystrokeTracker implements EventTracker {

    /**
     * Initialize a KeystrokeTracker that contains a KeystrokeDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: DatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
    public addDOMEvent() {
        $("body").on("keypress", (eventObject: JQueryEventObject) => {
            this.db.post(EventFactory.keystroke(String.fromCharCode(eventObject.which),
                // TODO: key_down_at and key_up_at should be set correctly.
                EventFactory.getTime(), EventFactory.getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $("body").off("keypress");
    }

}
