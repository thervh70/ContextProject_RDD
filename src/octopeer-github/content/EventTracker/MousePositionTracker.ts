/**
 * Created by Mathias on 2016-05-27.
 */
class MousePositionTracker {

    /** Private static final for the timeout between logs. */
    private static get MOUSE_POSITION_TRACKER_TIMEOUT() { return 500; }

    /**
     * Initialize a MousePositionTracker that contains a MousePositionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: MousePositionDatabaseAdaptable) {
        const self = this;
        let $window: JQuery;
        let mouseX: number;
        let mouseY: number;
        let viewportX: number;
        let viewportY: number;
        setInterval(function () {
            $(document).one("mousemove", function (eventObject: JQueryEventObject) {
                $window = $(window);
                mouseX = eventObject.pageX;
                mouseY = eventObject.pageY;
                viewportX = $window.scrollLeft();
                viewportY = $window.scrollTop();
                self.db.postMousePosition(new MousePositionEvent(viewportX + mouseX, viewportY + mouseY,
                    viewportX, viewportY, new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
            });
        }, this.MOUSE_POSITION_TRACKER_TIMEOUT);
    }
}
