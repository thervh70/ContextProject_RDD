/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MouseScrollTracker implements EventTracker {

    /** Public static final for the timeout between logs. */
    public static get TIMEOUT() { return 1000; }

    private resizeTimer: number;

    /**
     * Initialize a MouseScrollTracker that contains a MouseScrollDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: MouseScrollDatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
    public addDOMEvent() {
        const windowObject = $(window);
        windowObject.scroll((eventObject: JQueryEventObject) => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.db.postMouseScroll(EventFactory.mouseScroll(windowObject.scrollLeft(), windowObject.scrollTop()),
                    EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, MouseScrollTracker.TIMEOUT);
        });
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $(window).off("scroll");
        clearTimeout(this.resizeTimer);
    }
}
