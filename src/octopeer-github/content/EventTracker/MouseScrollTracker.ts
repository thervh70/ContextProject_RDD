/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MouseScrollTracker implements EventTracker {

    /** Public static final for the timeout between logs. */
    public static get TIMEOUT() { return 1000; }

    /**
     * This scrollTimer field is static, because there should only be one timer at any given time.
     * It stores the current timer that is active (and because of JavaScript, its type is a number).
     */
    private static scrollTimer: number;

    /**
     * Initialize a MouseScrollTracker that contains a MouseScrollDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: DatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
    public addDOMEvent() {
        const windowObject = $(window);
        windowObject.scroll((eventObject: JQueryEventObject) => {
            clearTimeout(MouseScrollTracker.scrollTimer);
            MouseScrollTracker.scrollTimer = setTimeout(() => {
                this.db.post(EventFactory.mouseScroll(windowObject.scrollLeft(), windowObject.scrollTop()),
                    EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, MouseScrollTracker.TIMEOUT);
        });
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $(window).off("scroll");
        clearTimeout(MouseScrollTracker.scrollTimer);
    }
}
