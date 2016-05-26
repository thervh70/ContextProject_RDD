///<reference path="../../main/DatabaseAdaptable/DatabaseAdaptable.ts"/>
///<reference path="../../main/DatabaseAdaptable/RESTApiDatabaseAdapter.ts"/>
const defaultEventID = new EventID(1);
const defaultElementID = new ElementID(1);

describe("A RESTApiDatabaseAdapter", function() {
    let adapter: RESTApiDatabaseAdapter;

    beforeEach(function() {
        jasmine.Ajax.install();

        adapter = new RESTApiDatabaseAdapter("http://localhost:8000/", "https://github.com/Travis/travisrepo/pull/42", "Travis");

        spyOn(Logger, "warn"); // suppress Logger warnings
    });

    afterEach(function() {
        delete adapter;
        jasmine.Ajax.uninstall();
    });

    it("correctly initializes on init", function() {
        expect(adapter.isInitialized).toBe(true);
    });

    it("can post to the API", function() {
        const spyFunc = jasmine.createSpy("success");

        adapter.post(new EventObject(defaultElementID, defaultEventID, new Date().getTime(), 100), spyFunc, EMPTY_CALLBACK);

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

        adapter.post(new EventObject(defaultElementID, defaultEventID, new Date().getTime(), 100), successSpy, failureSpy);

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

        adapter.post(new EventObject(defaultElementID, defaultEventID, new Date().getTime(), 100), successSpy, failureSpy);

        expect(successSpy).not.toHaveBeenCalled();
        expect(failureSpy).toHaveBeenCalled();
    });

    it("can be set to debug mode", function() {
        Logger.setDebug();
        const consoleSpy = spyOn(Logger, "debug");

        adapter.setDebug();

        adapter.post(new EventObject(defaultElementID, defaultEventID, new Date().getTime(), 100), EMPTY_CALLBACK, EMPTY_CALLBACK);
        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: true}),
            status: 201,
        });

        expect(consoleSpy).toHaveBeenCalledTimes(3);
        expect(consoleSpy.calls.all()[0].args[0]).toBe("Call success, status: success");
    });
});
