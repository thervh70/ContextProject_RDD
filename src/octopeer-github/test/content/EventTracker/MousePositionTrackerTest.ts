/**
 * Created by Maarten on 27-05-2016.
 */

describe("A MousePositionTracker", function() {

    let db: DatabaseAdaptable;
    let tracker: MousePositionTracker;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
        tracker = new MousePositionTracker(db);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should track mouse position every half a second, unless the position didn't change", function() {
        const dbSpy = spyOn(db, "postMousePosition");
        tracker.addDOMEvent();

        $(document).trigger($.Event("mousemove", {pageX: 80, pageY: 80}));

        jasmine.clock().tick(MousePositionTracker.TIMEOUT + 1);
        expect(dbSpy).toHaveBeenCalledTimes(1);

        jasmine.clock().tick(MousePositionTracker.TIMEOUT + 1);
        expect(dbSpy).toHaveBeenCalledTimes(1); // this is the total amount of calls, meaning no new call has been made
    });

    it("should no longer track mouse positions when removed from DOM", function() {
        const dbSpy = spyOn(db, "postMousePosition");
        tracker.addDOMEvent();
        tracker.removeDOMEvent();

        $(document).trigger($.Event("mousemove", {pageX: 80, pageY: 80}));
        jasmine.clock().tick(MousePositionTracker.TIMEOUT + 1);

        expect(dbSpy).not.toHaveBeenCalled();
    });
});
