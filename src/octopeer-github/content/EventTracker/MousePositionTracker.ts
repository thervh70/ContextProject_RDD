/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MousePositionTracker implements EventTracker {

    /** Public static final for the timeout between logs. */
    public static get TIMEOUT() { return 500; }

    /** This intervalTimer field is static, because there should only be one timer at any given time. */
    private static intervalTimer: number;

    private x: number;
    private y: number;
    private prevX: number;
    private prevY: number;

    /**
     * Initialize a MousePositionTracker that contains a MousePositionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: MousePositionDatabaseAdaptable) { }

    public addDOMEvent() {
        this.removeDOMEvent();
        $(document).on("mousemove", (eventObject: JQueryEventObject) => {
            this.x = eventObject.pageX;
            this.y = eventObject.pageY;
        });
        MousePositionTracker.intervalTimer = setInterval(() => {
            if (this.prevX === this.x && this.prevY === this.y) {
                return;
            }
            const windowObject = $(window);
            const viewportX = windowObject.scrollLeft();
            const viewportY = windowObject.scrollTop();
            this.db.postMousePosition(EventFactory.mousePosition(viewportX + this.x, viewportY + this.y,
                viewportX, viewportY), EMPTY_CALLBACK, EMPTY_CALLBACK);
            this.prevX = this.x;
            this.prevY = this.y;
        }, MousePositionTracker.TIMEOUT);
    }

    public removeDOMEvent() {
        $(document).off("mousemove");
        clearInterval(MousePositionTracker.intervalTimer);
    }

}
