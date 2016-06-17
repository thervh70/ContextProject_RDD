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

    for (let eventtype of ["keydown", "keyup"]) {
        it(`should track ${eventtype} events`, function () {
            const dbSpy = spyOn(db, "post");
            tracker.addDOMEvent();

            $("body").trigger($.Event(eventtype, {key: "p"}));

            expect(dbSpy).toHaveBeenCalledTimes(1);
        });

        it(`should no longer track ${eventtype} events when removed from DOM`, function () {
            const dbSpy = spyOn(db, "post");
            tracker.addDOMEvent();
            tracker.removeDOMEvent();

            $("body").trigger($.Event(eventtype, {key: "p"}));

            expect(dbSpy).not.toHaveBeenCalled();
        });
    }
});
