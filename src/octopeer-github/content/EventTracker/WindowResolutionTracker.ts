/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-26.
 */
class WindowResolutionTracker {

    /** Private static final for the timeout between logs. */
    private static get TIMEOUT() { return 500; }

    /**
     * Initialize a WindowResolutionTracker that contains a WindowResolutionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: WindowResolutionDatabaseAdaptable) {
        const self = this;
        let windowObject: JQuery = $(window);
        let resizeTimer: number;
        windowObject.resize(function (eventObject: JQueryEventObject) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                self.db.postWindowResolution(EventFactory.windowResolution(windowObject.width(), windowObject.height()),
                    EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, WindowResolutionTracker.TIMEOUT);
        });
    }
}
