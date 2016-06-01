/**
 * Created by Mitchell on 26-5-2016.
 * Behaviour unit tests for the ConsoleLogDatabaseAdapter class.
 */

describe("The ConsoleLogDatabaseAdapter", function() {
    let CLDAdapter: DatabaseAdaptable;
    let spy: jasmine.Spy;

    beforeEach(function() {
        CLDAdapter = new ConsoleLogDatabaseAdapter();
        spy = spyOn(Logger, "database");
    });

    it("should 'post' data to the console by calling the post function", function () {
        const data = EventFactory.semantic(defaultElementID, defaultEventID);
        CLDAdapter.postSemantic(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("should 'post' a keystroke event", function () {
        const data = EventFactory.keystroke("0", 0, 0);
        CLDAdapter.postKeystroke(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("should 'post' a mouse position event", function () {
        const data = EventFactory.mousePosition(1, 2, 3, 4);
        CLDAdapter.postMousePosition(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("should 'post' a mouse click event", function () {
        const data = EventFactory.mouseClick();
        CLDAdapter.postMouseClick(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("should 'post' a mouse scroll event", function () {
        const data = EventFactory.mouseScroll(1, 2);
        CLDAdapter.postMouseScroll(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("should 'post' a window resize event", function () {
        const data = EventFactory.windowResolution(1, 2);
        CLDAdapter.postWindowResolution(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });

    it("should output the raw data by default", function () {
        expect(ConsoleLogDatabaseAdapter.getRawDataLogging()).toBe(true);
    });

    it("should correctly set a new value", function () {
        expect(ConsoleLogDatabaseAdapter.getRawDataLogging()).toBe(true);

        ConsoleLogDatabaseAdapter.setRawDataLogging(false);

        expect(ConsoleLogDatabaseAdapter.getRawDataLogging()).toBe(false);
    });

    it("should filter if the output is disabled", function () {
        ConsoleLogDatabaseAdapter.setRawDataLogging(false);

        const data = EventFactory.mouseClick();
        CLDAdapter.postMouseClick(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).not.toHaveBeenCalled();
    });
});
