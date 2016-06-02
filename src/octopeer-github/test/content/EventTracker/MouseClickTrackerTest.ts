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
    });

    it("should be instantiated in the right way, with default dbPosition", function() {
        // tslint:disable-next-line:no-unused-expression
        new MouseClickTracker(db);

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpyClick).toHaveBeenCalledTimes(1);
        expect(dbSpyPosition).toHaveBeenCalledTimes(1);
    });

    it("should be instantiated in the right way, with a different dbPosition", function() {
        // tslint:disable-next-line:no-unused-expression
        new MouseClickTracker(db, db);

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpyClick).toHaveBeenCalledTimes(1);
        expect(dbSpyPosition).toHaveBeenCalledTimes(1);
    });
});
