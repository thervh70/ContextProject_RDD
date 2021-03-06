/**
 * Created by Maarten on 09-06-2016.
 */

describe("A WindowResolutionTracker", function() {

    let db: DatabaseAdaptable;
    let tracker: WindowResolutionTracker;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
        tracker = new WindowResolutionTracker(db);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should track window resizes every half a second, unless the position didn't change", function() {
        const dbSpy = spyOn(db, "post");
        tracker.addDOMEvent();

        $(window).trigger($.Event("resize"));

        jasmine.clock().tick(WindowResolutionTracker.TIMEOUT + 1);
        expect(dbSpy).toHaveBeenCalledTimes(1);

        jasmine.clock().tick(WindowResolutionTracker.TIMEOUT + 1);
        expect(dbSpy).toHaveBeenCalledTimes(1); // this is the total amount of calls, meaning no new call has been made
    });

    it("should track only one window resize event, when the times between them are less than a second", function() {
        const dbSpy = spyOn(db, "post");
        tracker.addDOMEvent();

        $(window).trigger($.Event("resize"));
        jasmine.clock().tick(WindowResolutionTracker.TIMEOUT / 2);

        $(window).trigger($.Event("resize"));
        jasmine.clock().tick(WindowResolutionTracker.TIMEOUT + 1);

        expect(dbSpy).toHaveBeenCalledTimes(1);
    });

    it("should no longer track window resizes when removed from DOM", function() {
        const dbSpy = spyOn(db, "post");
        tracker.addDOMEvent();
        tracker.removeDOMEvent();

        $(window).trigger($.Event("scroll", {pageX: 80, pageY: 80}));
        jasmine.clock().tick(WindowResolutionTracker.TIMEOUT + 1);

        expect(dbSpy).not.toHaveBeenCalled();
    });
});
