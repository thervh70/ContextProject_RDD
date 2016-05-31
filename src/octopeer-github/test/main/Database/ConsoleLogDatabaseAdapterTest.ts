/**
 * Created by Mitchell on 26-5-2016.
 * Behaviour unit tests for the ConsoleLogDatabaseAdapter class.
 */

describe("The ConsoleLogDatabaseAdapter", function() {
    let data: SemanticEvent;
    let CLDAdapter: DatabaseAdaptable;
    let spy: jasmine.Spy;

    it("should 'post' data to the console by calling the post function", function () {
        CLDAdapter = new ConsoleLogDatabaseAdapter();
        data = EventFactory.semantic(defaultElementID, defaultEventID, new Date().getTime(), 42);
        spy = spyOn(Logger, "database");
        CLDAdapter.postSemantic(data, EMPTY_CALLBACK, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });
});
