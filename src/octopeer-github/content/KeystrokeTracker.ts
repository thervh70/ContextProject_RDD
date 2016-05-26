/**
 * Created by Mathias on 2016-05-26.
 */
class KeystrokeTracker {

    /**
     * Initialize a KeystrokeTracker that contains a KeystrokeDatabaseAdaptable.
     * @param db The DatabaseAdaptable for the Tracker.
     */
    constructor(private db: KeystrokeDatabaseAdaptable) {
        const self = this;
        let $window: JQuery = $(window);
        let resizeTimer: number;
        $window.resize(function (eventObject: JQueryEventObject) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                self.db.postKeystroke(new KeystrokeEvent("",
                    new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
            }, 500);
        });
    }

    /**
     * Get a Callback to bind to the proper Event.
     * @returns {function(any): undefined}
     */
    public getCallback() {
        return (function(event: any) {
            const self = this;
            // const data = "test";
            self.db.postKeystroke(new KeystrokeEvent("a", new Date().getTime()), EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }
}
