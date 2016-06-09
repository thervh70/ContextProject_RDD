/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MousePositionTracker implements EventTracker {

    /** Public static final for the timeout between logs. */
    public static get TIMEOUT() { return 500; }

    /**
     * This intervalTimer field is static, because there should only be one timer at any given time.
     * It stores the current timer that is active (and because of JavaScript, its type is a number).
     */
    private static intervalTimer: number;

    /** The current x-position of the mouse. */
    private x: number;
    /** The current y-position of the mouse. */
    private y: number;
    /** The x-position of the mouse that has last been logged. */
    private prevX: number;
    /** The y-position of the mouse that has last been logged. */
    private prevY: number;

    /**
     * Initialize a MousePositionTracker that contains a MousePositionDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: DatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
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
            this.db.post(EventFactory.mousePosition(viewportX + this.x, viewportY + this.y,
                viewportX, viewportY), EMPTY_CALLBACK, EMPTY_CALLBACK);
            this.prevX = this.x;
            this.prevY = this.y;
        }, MousePositionTracker.TIMEOUT);
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $(document).off("mousemove");
        clearInterval(MousePositionTracker.intervalTimer);
    }

}
