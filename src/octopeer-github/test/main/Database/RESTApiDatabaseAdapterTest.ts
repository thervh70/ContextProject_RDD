///<reference path="../../../main/Database/RESTApiDatabaseAdapter.ts"/>

// These constants are used in other tests as well, thus outside the describe.
const defaultEventID = new EventID(1);
const defaultElementID = new ElementID(1);

describe("A RESTApiDatabaseAdapter", function() {
    const defaultSemanticEvent = new SemanticEvent(defaultElementID, defaultEventID, new Date().getTime(), 100);

    let adapter: RESTApiDatabaseAdapter;
    let consoleSpy: jasmine.Spy;

    beforeAll(function() {
        Logger.setDebug(false);
    });

    beforeEach(function() {
        jasmine.Ajax.install();

        adapter = new RESTApiDatabaseAdapter("http://localhost:8000/", "https://github.com/Travis/travisrepo/pull/42", "Travis");

        spyOn(Logger, "warn"); // suppress Logger warnings
    });

    afterEach(function() {
        delete adapter;
        jasmine.Ajax.uninstall();
        Logger.setDebug(false);
    });

    it("correctly initializes on init", function() {
        expect(adapter.isInitialized).toBe(true);
    });

    it("can post to the API", function() {
        const spyFunc = jasmine.createSpy("success");

        adapter.postSemantic(defaultSemanticEvent, spyFunc, EMPTY_CALLBACK);

        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: true}),
            status: 201,
        });

        expect(spyFunc).toHaveBeenCalled();
        expect(spyFunc.calls.mostRecent().args[0]).toEqual({success: true});
    });

    it("calls the failure callback when the API responds with failure", function() {
        const successSpy = jasmine.createSpy("success");
        const failureSpy = jasmine.createSpy("failure");

        adapter.postSemantic(defaultSemanticEvent, successSpy, failureSpy);

        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: false}),
            status: 400,
        });

        expect(successSpy).not.toHaveBeenCalled();
        expect(failureSpy).toHaveBeenCalled();
    });

    it("cannot post to the API when not initialized", function() {
        delete adapter;
        adapter = new RESTApiDatabaseAdapter("http://localhost:8000/", "https://github.com/invalid/url", "Travis");
        expect(adapter.isInitialized).toBe(false);

        const successSpy = jasmine.createSpy("success");
        const failureSpy = jasmine.createSpy("failure");

        adapter.postSemantic(defaultSemanticEvent, successSpy, failureSpy);

        expect(successSpy).not.toHaveBeenCalled();
        expect(failureSpy).toHaveBeenCalled();
    });

    it("can be set to debug mode on", function() {
        Logger.setDebug();
        consoleSpy = spyOn(Logger, "debug");

        adapter.setDebug();

        adapter.postSemantic(defaultSemanticEvent, EMPTY_CALLBACK, EMPTY_CALLBACK);
        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: true}),
            status: 201,
        });

        expect(consoleSpy).toHaveBeenCalledTimes(3);
        expect(consoleSpy.calls.all()[0].args[0]).toBe("Call success, status: success");
    });

    it("can be set to debug mode off", function() {
        Logger.setDebug();
        consoleSpy = spyOn(Logger, "debug");

        adapter.setDebug(false);

        adapter.postSemantic(defaultSemanticEvent, EMPTY_CALLBACK, EMPTY_CALLBACK);
        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: true}),
            status: 201,
        });

        expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("can be initialized with debug mode on", function() {
        Logger.setDebug();
        consoleSpy = spyOn(Logger, "debug");

        let adapterDebugOn =
            new RESTApiDatabaseAdapter("http://localhost:8000/", "https://github.com/Travis/travisrepo/pull/42", "Travis", true);

        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy.calls.all()[0].args[0]).toBe("Constructed DatabaseAdapter(http://localhost:8000/)");
    });
});
