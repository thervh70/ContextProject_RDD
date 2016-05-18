/**
 * Created by Maarten on 18-05-2016.
 */

describe("The Logger", function() {

    let consoleSpy: jasmine.Spy;

    beforeEach(function() {
        consoleSpy = spyOn(console, "log");
        consoleSpy.calls.reset();
        Logger.setDebug(false);
    });

    it("should log warnings", function() {
        Logger.log("this is a warning");
        expect(consoleSpy).toHaveBeenCalledWith("[WARN ] ", "this is a warning");
    });

    it("should log not debug messages", function() {
        Logger.debug("this is a debug message");
        expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("should log debug messages when it is set to debug mode", function() {
        Logger.setDebug();
        Logger.debug("this is a debug message");
        expect(consoleSpy).toHaveBeenCalledWith("[DEBUG] ", "this is a debug message");

        Logger.setDebug(false); // cleanup
    });

});
