///<reference path="../main/DatabaseAdapter.ts"/>

describe("A DatabaseAdapter", function() {
    let adapter: DatabaseAdapter;

    beforeEach(function() {
        jasmine.Ajax.install();

        adapter = new DatabaseAdapter("http://localhost:8000", 1, 1);
        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: '{"url":"http://localhost:8000/api/users/42/","username":"Travis"}',
            status: 201,
        });
    });

    afterEach(function() {
        delete adapter;
        jasmine.Ajax.uninstall();
    });

    it("correctly adds a trailing slash to the url", function() {
        delete adapter;
        adapter = new DatabaseAdapter("http://localhost:8000/", 1, 1);
        expect(adapter.url).toBe("http://localhost:8000/");
    });

    it("should not add a trailing slash to the url when it is already there", function() {
        expect(adapter.url).toBe("http://localhost:8000/");
    });

    it("correctly initializes on init", function() {
        expect(adapter.isInitialized).toBe(true);
    });

    it("correctly sets the session number", function() {
        expect(adapter.session).toBe(42);
    });

    it("can post to the API", function() {
        const spyFunc = jasmine.createSpy("success");

        adapter.post(1, new Date(), 100, spyFunc);

        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: true}),
            status: 201,
        });

        expect(spyFunc).toHaveBeenCalled();
        expect(spyFunc.calls.mostRecent().args[0]).toEqual({success: true});
    });

    it("can be set to debug mode", function() {
        const consoleSpy = spyOn(console, "log");

        adapter.setDebug();

        adapter.post(1, new Date(), 100, function(data) {return data; });
        jasmine.Ajax.requests.mostRecent().respondWith({
            contentType: "text/json",
            responseText: JSON.stringify({success: true}),
            status: 201,
        });

        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy.calls.all()[0].args[0]).toBe("Sent out AJAX request: ");
        expect(consoleSpy.calls.all()[1].args[0]).toBe("Call success, status: success");
    });
});
