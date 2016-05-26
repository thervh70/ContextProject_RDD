/**
 * Created by Mathias on 2016-05-26.
 */
class ResizeTracker {

    constructor(private db: WindowResolutionDatabaseAdaptable) {
        const self = this;
        let $window: JQuery = $(window);
        let resizeTimer: number;
        $window.resize(function (eventObject: JQueryEventObject) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                self.db.postWindowResolution(new WindowResolutionEvent($window.width(), $window.height(),
                    new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, 500);
        });
    }
}
