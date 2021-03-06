/**
 * Created by Maarten on 09-06-2016.
 */

describe("A MouseScrollTracker", function() {

    let db: DatabaseAdaptable;
    let tracker: MouseScrollTracker;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
        tracker = new MouseScrollTracker(db);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should track mouse scrolls every second when the scroll:finish event fires, unless the position didn't change", function() {
        const dbSpy = spyOn(db, "post");
        tracker.addDOMEvent();

        $(window).trigger($.Event("scroll:finish", {pageX: 80, pageY: 80}));

        jasmine.clock().tick(MouseScrollTracker.TIMEOUT + 1);
        expect(dbSpy).toHaveBeenCalledTimes(1);

        jasmine.clock().tick(MouseScrollTracker.TIMEOUT + 1);
        expect(dbSpy).toHaveBeenCalledTimes(1); // this is the total amount of calls, meaning no new call has been made
    });

    it("should no longer track mouse positions when removed from DOM", function() {
        const dbSpy = spyOn(db, "post");
        tracker.addDOMEvent();
        tracker.removeDOMEvent();

        $(window).trigger($.Event("scroll:finish", {pageX: 80, pageY: 80}));
        jasmine.clock().tick(MouseScrollTracker.TIMEOUT + 1);

        expect(dbSpy).not.toHaveBeenCalled();
    });
});
