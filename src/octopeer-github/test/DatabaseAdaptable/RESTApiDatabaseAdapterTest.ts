///<reference path="../../main/DatabaseAdaptable/DatabaseAdaptable.ts"/>
///<reference path="../../main/DatabaseAdaptable/RESTApiDatabaseAdapter.ts"/>
const defaultEventID = new EventID(1);
const defaultElementID = new ElementID(1);

describe("A RESTApiDatabaseAdapter", function() {
    let adapter: RESTApiDatabaseAdapter;

    beforeEach(function() {
        jasmine.Ajax.install();

        adapter = new RESTApiDatabaseAdapter("http://localhost:8000/", "https://github.com/Travis/travisrepo/pull/42", "Travis");

        Logger.setDebug();
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

    it("cannot post to the API when not initialized", function() {
        spyOn(Logger, "log"); // suppress Logger logs of all levels
        delete adapter;
        adapter = new RESTApiDatabaseAdapter("http://localhost:8000/", "https://github.com/invalid/url", "Travis");

        const spyFunc = jasmine.createSpy("success");

        adapter.post(new EventObject(defaultElementID, defaultEventID, new Date().getTime(), 100), spyFunc, EMPTY_CALLBACK);

        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: false}),
            status: 400,
        });

        expect(spyFunc).not.toHaveBeenCalled();
    });

    it("can be set to debug mode", function() {
        const consoleSpy = spyOn(Logger, "debug");

        adapter.setDebug();

        adapter.post(new EventObject(defaultElementID, defaultEventID, new Date().getTime(), 100), EMPTY_CALLBACK, EMPTY_CALLBACK);
        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: true}),
            status: 201,
        });

        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy.calls.all()[0].args[0]).toBe("Call success, status: success");
    });
});
