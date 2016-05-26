/**
 * Created by Mathias on 2016-05-27.
 */
class MouseClickTracker {

    /**
     * Initialize a MouseClickTracker that contains a MouseClickDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: MouseClickDatabaseAdaptable) {
        const self = this;
        const $window = $(window);
        $window.off("click");
        $window.on("click", function (eventObject: JQueryEventObject) {
            self.db.postMouseClick(new MouseClickEvent(new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }
}
