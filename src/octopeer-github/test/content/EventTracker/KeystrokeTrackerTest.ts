/**
 * Created by Maarten on 27-05-2016.
 */

describe("A KeystrokeTracker", function() {

    let db: DatabaseAdaptable;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
    });

    it("should track keypress events", function() {
        const dbSpy = spyOn(db, "postKeystroke");
        // tslint:disable-next-line:no-unused-expression
        new KeystrokeTracker(db).addDOMEvent();

        $("body").trigger($.Event("keypress", {which: " "}));

        expect(dbSpy).toHaveBeenCalledTimes(1);
    });

    it("should no longer track keypress events when removed from DOM", function() {
        const dbSpy = spyOn(db, "postKeystroke");
        // tslint:disable-next-line:no-unused-expression
        new KeystrokeTracker(db).addDOMEvent();
        new KeystrokeTracker(db).removeDOMEvent();

        $("body").trigger($.Event("keypress", {which: " "}));

        expect(dbSpy).not.toHaveBeenCalled();
    });
});
