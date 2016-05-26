/**
 * Created by Mathias on 2016-05-27.
 */
class MousePositionTracker {

    /**
     * Initialize a MousePositionTracker that contains a MousePositionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: MousePositionDatabaseAdaptable) {
        const self = this;
        const $window = $(window);
        $(document).one("mousemove", function (eventObject: JQueryEventObject) {
            let mouseX: number;
            let mouseY: number;
            let viewportX: number;
            let viewportY: number;
            setInterval(function () {
                mouseX = eventObject.pageX;
                mouseY = eventObject.pageY;
                viewportX = $window.scrollLeft();
                viewportY = $window.scrollTop();
                self.db.postMousePosition(new MousePositionEvent(viewportX + mouseX, viewportY + mouseY,
                    viewportX, viewportY, new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, 500);
        });
    }
}

