/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MouseScrollTracker implements EventTracker {

    /** Public static final for the timeout between logs. */
    public static get TIMEOUT() { return 1000; }

    /**
     * Initialize a MouseScrollTracker that contains a DatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: DatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
    public addDOMEvent() {
        const windowObject = $(window);
        windowObject.on("scroll:finish", () => {
            this.db.post(EventFactory.mouseScroll(windowObject.scrollLeft(), windowObject.scrollTop()),
                EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $(window).off("scroll:finish");
    }
}
