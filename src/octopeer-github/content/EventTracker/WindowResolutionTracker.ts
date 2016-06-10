/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-26.
 */
class WindowResolutionTracker implements EventTracker {

    /** Public static final for the timeout between logs. */
    public static get TIMEOUT() { return 500; }

    /**
     * This resizeTimer field is static, because there should only be one timer at any given time.
     * It stores the current timer that is active (and because of JavaScript, its type is a number).
     */
    private static resizeTimer: number;

    /**
     * Initialize a WindowResolutionTracker that contains a WindowResolutionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: WindowResolutionDatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
    public addDOMEvent() {
        let windowObject: JQuery = $(window);
        windowObject.resize((eventObject: JQueryEventObject) => {
            clearTimeout(WindowResolutionTracker.resizeTimer);
            WindowResolutionTracker.resizeTimer = setTimeout(() => {
                this.db.postWindowResolution(EventFactory.windowResolution(windowObject.width(), windowObject.height()),
                    EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, WindowResolutionTracker.TIMEOUT);
        });
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $(window).off("resize");
        clearTimeout(WindowResolutionTracker.resizeTimer);
    }
}
