/**
 * Created by Maarten on 27-05-2016.
 */

describe("A MouseClickTracker", function() {

    let db: DatabaseAdaptable;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
    });

    it("should", function() {
        const dbSpyClick = spyOn(db, "postMouseClick");
        const dbSpyPosition = spyOn(db, "postMousePosition");
        // tslint:disable-next-line:no-unused-expression
        new MouseClickTracker(db);

        $("body").trigger($.Event("click", {pageX: 42, pageY: 84}));

        expect(dbSpyClick).toHaveBeenCalledTimes(1);
        expect(dbSpyPosition).toHaveBeenCalledTimes(1);
    });
});
