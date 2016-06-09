/// <reference path="../../main/Database/DatabaseAdaptable/MouseClickDatabaseAdaptable.ts"/>
/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MouseClickTracker implements EventTracker {

    /**
     * Initialize a MouseClickTracker that contains a MouseClickDatabaseAdaptable.
     * @param dbClick The DatabaseAdaptable for the Tracker to post click events.
     * @param dbPosition The DatabaseAdaptable for the Tracker to post position events.
     */
    constructor(private dbClick: MouseClickDatabaseAdaptable, private dbPosition: MousePositionDatabaseAdaptable = undefined) {
        if (dbPosition === undefined) {
            if ((<DatabaseAdaptable>dbClick).postMousePosition !== undefined) {
                this.dbPosition = <DatabaseAdaptable>dbClick;
            } else {
                Logger.warn("MouseClickTracker was instantiated wrongly!");
                return;
            }
        }
    }

    public addDOMEvent() {
        const windowObject = $(window);
        windowObject.on("click", (eventObject: JQueryEventObject) => {
            const mouseX = eventObject.pageX;
            const mouseY = eventObject.pageY;
            const viewportX = windowObject.scrollLeft();
            const viewportY = windowObject.scrollTop();
            const time = EventFactory.getTime();
            this.dbClick.postMouseClick(EventFactory.mouseClick(time), EMPTY_CALLBACK, EMPTY_CALLBACK);
            this.dbPosition.postMousePosition(EventFactory.mousePosition(viewportX + mouseX, viewportY + mouseY,
                viewportX, viewportY, time), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }

    public removeDOMEvent() {
        $(window).off("click");
    }

}
