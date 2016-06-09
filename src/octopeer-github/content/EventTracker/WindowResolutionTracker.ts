/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-26.
 */
class WindowResolutionTracker implements EventTracker {

    /** Public static final for the timeout between logs. */
    public static get TIMEOUT() { return 500; }

    private static resizeTimer: number;

    /**
     * Initialize a WindowResolutionTracker that contains a WindowResolutionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: WindowResolutionDatabaseAdaptable) { }

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

    public removeDOMEvent() {
        $(window).off("resize");
        clearTimeout(WindowResolutionTracker.resizeTimer);
    }
}
