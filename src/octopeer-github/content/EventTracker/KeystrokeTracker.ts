/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-26.
 */
class KeystrokeTracker implements EventTracker {

    /**
     * Initialize a KeystrokeTracker that contains a DatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: DatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
    public addDOMEvent() {
        $("body").on("keydown", (eventObject: JQueryEventObject) => {
            this.db.post(EventFactory.keyDown(eventObject.key), EMPTY_CALLBACK, EMPTY_CALLBACK);
        }).on("keyup", (eventObject: JQueryEventObject) => {
            this.db.post(EventFactory.keyUp(eventObject.key), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $("body").off("keydown keyup");
    }

}
