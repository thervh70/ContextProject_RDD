/**
 * Created by Maarten on 27-05-2016.
 */

describe("A KeystrokeTracker", function() {

    let db: DatabaseAdaptable;

    beforeEach(function() {
        db = new ConsoleLogDatabaseAdapter();
    });

   it("should", function() {
       const dbSpy = spyOn(db, "postKeystroke");
       // tslint:disable-next-line:no-unused-expression
       new KeystrokeTracker(db);

       $("body").trigger($.Event("keypress", {which: " "}));

       expect(dbSpy).toHaveBeenCalledTimes(1);
   });
});
