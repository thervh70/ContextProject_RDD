/**
 * Created by Maarten on 27-05-2016.
 */

describe("A MouseClickTracker", function() {

    let db: DatabaseAdaptable;
    let dbSpy: jasmine.Spy;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
        dbSpy = spyOn(db, "post");
        spyOn(Logger, "log"); // suppress all console logs
    });

    it("should be instantiated in the right way", function() {
        // tslint:disable-next-line:no-unused-expression
        new MouseClickTracker(db).addDOMEvent();

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpy).toHaveBeenCalledTimes(2);
    });

    it("should no longer track mouseclick events when removed from DOM", function() {
        const tracker = new MouseClickTracker(db);
        tracker.addDOMEvent();
        tracker.removeDOMEvent();

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpy).not.toHaveBeenCalled();
    });
});
