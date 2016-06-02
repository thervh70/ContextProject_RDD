/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MouseScrollTracker {

    /** Private static final for the timeout between logs. */
    private static get TIMEOUT() { return 1000; }

    /**
     * Initialize a MouseScrollTracker that contains a MouseScrollDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: MouseScrollDatabaseAdaptable) {
        const self = this;
        const windowObject = $(window);
        let resizeTimer: number;
        windowObject.scroll(function (eventObject: JQueryEventObject) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                self.db.postMouseScroll(EventFactory.mouseScroll(windowObject.scrollLeft(), windowObject.scrollTop(),
                    new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, MouseScrollTracker.TIMEOUT);
        });
    }
}
