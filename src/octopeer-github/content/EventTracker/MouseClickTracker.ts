/// <reference path="../../main/Database/DatabaseAdaptable/MouseClickDatabaseAdaptable.ts"/>
/// <reference path="../../main/Database/EventObject/EventFactory.ts"/>
/**
 * Created by Mathias on 2016-05-27.
 */
class MouseClickTracker {

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
        const self = this;
        let windowObject = $(window);
        let mouseX: number;
        let mouseY: number;
        let viewportX: number;
        let viewportY: number;
        windowObject.off("click");
        windowObject.on("click", function (eventObject: JQueryEventObject) {
            windowObject = $(window);
            mouseX = eventObject.pageX;
            mouseY = eventObject.pageY;
            viewportX = windowObject.scrollLeft();
            viewportY = windowObject.scrollTop();
            const time = EventFactory.getTime();
            self.dbClick.postMouseClick(EventFactory.mouseClick(time), EMPTY_CALLBACK, EMPTY_CALLBACK);
            self.dbPosition.postMousePosition(EventFactory.mousePosition(viewportX + mouseX, viewportY + mouseY,
                viewportX, viewportY, time), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }

}
