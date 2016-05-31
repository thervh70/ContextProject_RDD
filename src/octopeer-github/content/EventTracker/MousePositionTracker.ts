/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MousePositionTracker {

    /** Private static final for the timeout between logs. */
    private static get TIMEOUT() { return 500; }

    /** This intervalTimer field is static, because there should only be one timer at any given time. */
    private static intervalTimer: number;

    /**
     * Initialize a MousePositionTracker that contains a MousePositionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: MousePositionDatabaseAdaptable) {
        const self = this;
        let windowObject: JQuery;
        let mouseX: number;
        let mouseY: number;
        let viewportX: number;
        let viewportY: number;
        clearInterval(MousePositionTracker.intervalTimer);
        MousePositionTracker.intervalTimer = setInterval(function () {
            $(document).one("mousemove", function (eventObject: JQueryEventObject) {
                windowObject = $(window);
                mouseX = eventObject.pageX;
                mouseY = eventObject.pageY;
                viewportX = windowObject.scrollLeft();
                viewportY = windowObject.scrollTop();
                self.db.postMousePosition(EventFactory.mousePosition(viewportX + mouseX, viewportY + mouseY,
                    viewportX, viewportY, new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
            });
        }, MousePositionTracker.TIMEOUT);
    }
}
