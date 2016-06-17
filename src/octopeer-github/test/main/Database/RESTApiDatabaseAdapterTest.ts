///<reference path="../../../main/Database/RESTApiDatabaseAdapter.ts"/>

// These constants are used in other tests as well, thus outside the describe.
const defaultEventID = new EventID(1);
const defaultElementID = new ElementID(1);

describe("A RESTApiDatabaseAdapter", function() {
    const defaultSemanticEvent = EventFactory.semantic(defaultElementID, defaultEventID);
    const defaultKeystrokeEvent = EventFactory.keystroke("q", EventFactory.getTime(), EventFactory.getTime());
    const defaultMouseClickEvent = EventFactory.mouseClick();
    const defaultMousePositionEvent = EventFactory.mousePosition(1, 2, 3, 4);
    const defaultMouseScrollEvent = EventFactory.mouseScroll(1, 2);
    const defaultWindowResolutionEvent = EventFactory.windowResolution(1, 2);

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

    const spyFunc = jasmine.createSpy("success");
    const eventTypes = [
        ["semantic-events", () => adapter.post(defaultSemanticEvent, spyFunc, EMPTY_CALLBACK)],
        ["keystroke-events", () => adapter.post(defaultKeystrokeEvent, spyFunc, EMPTY_CALLBACK)],
        ["mouse-click-events", () => adapter.post(defaultMouseClickEvent, spyFunc, EMPTY_CALLBACK)],
        ["mouse-position-events", () => adapter.post(defaultMousePositionEvent, spyFunc, EMPTY_CALLBACK)],
        ["mouse-scroll-events", () => adapter.post(defaultMouseScrollEvent, spyFunc, EMPTY_CALLBACK)],
        ["window-resolution-events", () => adapter.post(defaultWindowResolutionEvent, spyFunc, EMPTY_CALLBACK)],
    ];
    for (let tuple of eventTypes) {
        it(`can post ${tuple[0]} to the API`, function () {
            (<() => void>tuple[1])();

            jasmine.Ajax.requests.mostRecent().respondWith({
                contentType: "text/json",
                responseText: JSON.stringify({success: true}),
                status: 201,
            });

            expect(spyFunc).toHaveBeenCalled();
            expect(spyFunc.calls.mostRecent().args[0]).toEqual({success: true});
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`http://localhost:8000/api/${tuple[0]}/`);
        });
    }

    it("calls the failure callback when the API responds with failure", function() {
        const successSpy = jasmine.createSpy("success");
        const failureSpy = jasmine.createSpy("failure");

        adapter.post(defaultSemanticEvent, successSpy, failureSpy);

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

        adapter.post(defaultSemanticEvent, successSpy, failureSpy);

        expect(successSpy).not.toHaveBeenCalled();
        expect(failureSpy).toHaveBeenCalled();
    });

    it("can be set to debug mode on", function() {
        Logger.setDebug();
        consoleSpy = spyOn(Logger, "debug");

        adapter.setDebug();

        adapter.post(defaultSemanticEvent, EMPTY_CALLBACK, EMPTY_CALLBACK);
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

        adapter.post(defaultSemanticEvent, EMPTY_CALLBACK, EMPTY_CALLBACK);
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

        /* tslint:disable-next-line:no-unused-expression */
        new RESTApiDatabaseAdapter("http://localhost:8000/", "https://github.com/Travis/travisrepo/pull/42", "Travis", true);

        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy.calls.all()[0].args[0]).toBe("Constructed DatabaseAdapter(http://localhost:8000/)");
    });

    it("has to round data that is only accepted as integers", function() {
        let joc = jasmine.objectContaining;

        adapter.post(EventFactory.mouseScroll(23.1, 12.8, 123.456), spyFunc, EMPTY_CALLBACK);
        let expected = (<any>jasmine.Ajax.requests.mostRecent()).params;

        expect(JSON.parse(expected)).toEqual(joc({
            created_at: 123.456,
            viewport_x: 23,
            viewport_y: 13,
        }));
    });
});
