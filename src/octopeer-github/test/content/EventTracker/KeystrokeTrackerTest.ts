/**
 * Created by Maarten on 27-05-2016.
 */

describe("A KeystrokeTracker", function() {

    let db: DatabaseAdaptable;
    let tracker: KeystrokeTracker;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
        tracker = new KeystrokeTracker(db);
    });

    it("should track keypress events", function() {
        const dbSpy = spyOn(db, "post");
        tracker.addDOMEvent();

        $("body").trigger($.Event("keypress", {which: " "}));

        expect(dbSpy).toHaveBeenCalledTimes(1);
    });

    it("should no longer track keypress events when removed from DOM", function() {
        const dbSpy = spyOn(db, "post");
        tracker.addDOMEvent();
        tracker.removeDOMEvent();

        $("body").trigger($.Event("keypress", {which: " "}));

        expect(dbSpy).not.toHaveBeenCalled();
    });
});
