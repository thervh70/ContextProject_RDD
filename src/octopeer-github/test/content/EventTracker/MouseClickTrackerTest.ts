/**
 * Created by Maarten on 27-05-2016.
 */

describe("A MouseClickTracker", function() {

    let db: DatabaseAdaptable;
    let dbSpyClick: jasmine.Spy;
    let dbSpyPosition: jasmine.Spy;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
        dbSpyClick = spyOn(db, "postMouseClick");
        dbSpyPosition = spyOn(db, "postMousePosition");
        spyOn(Logger, "log"); // suppress all console logs
    });

    afterEach(function() {
        $("body").off("click"); // because remove
    });

    it("should be instantiated in the right way, with default dbPosition", function() {
        // tslint:disable-next-line:no-unused-expression
        new MouseClickTracker(db).addDOMEvent();

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpyClick).toHaveBeenCalledTimes(1);
        expect(dbSpyPosition).toHaveBeenCalledTimes(1);
    });

    it("should be instantiated in the right way, with a different dbPosition", function() {
        // tslint:disable-next-line:no-unused-expression
        new MouseClickTracker(db, db).addDOMEvent();

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpyClick).toHaveBeenCalledTimes(1);
        expect(dbSpyPosition).toHaveBeenCalledTimes(1);
    });

    it("should be instantiated in the right way and the Logger should warn when an exception is thrown", function() {
        let objAdapter = jasmine.createSpyObj("RESTApiDatabaseAdapter", ["constructor", "postMouseClick"]);
        let logMock = spyOn(Logger, "warn");
        // tslint:disable-next-line:no-unused-expression
        new MouseClickTracker(objAdapter);

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));
        expect(logMock).toHaveBeenCalled();
    });

    it("should no longer track mouseclick events when removed from DOM", function() {
        const tracker = new MouseClickTracker(db);
        tracker.addDOMEvent();
        tracker.removeDOMEvent();

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpyClick).not.toHaveBeenCalled();
        expect(dbSpyPosition).not.toHaveBeenCalled();
    });
});
