/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MouseClickTracker implements EventTracker {

    /**
     * Initialize a MouseClickTracker that contains a DatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker to post click and position events.
     */
    constructor(private db: DatabaseAdaptable) { }

    /**
     * Initiates this EventTracker to collect event data.
     */
    public addDOMEvent() {
        const windowObject = $(window);
        windowObject.on("click", (eventObject: JQueryEventObject) => {
            const mouseX = eventObject.pageX;
            const mouseY = eventObject.pageY;
            const viewportX = windowObject.scrollLeft();
            const viewportY = windowObject.scrollTop();
            const time = EventFactory.getTime();
            this.db.post(EventFactory.mouseClick(time), EMPTY_CALLBACK, EMPTY_CALLBACK);
            this.db.post(EventFactory.mousePosition(viewportX + mouseX, viewportY + mouseY,
                viewportX, viewportY, time), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }

    /**
     * Stops this EventTracker from collecting event data.
     */
    public removeDOMEvent() {
        $(window).off("click");
    }

}
