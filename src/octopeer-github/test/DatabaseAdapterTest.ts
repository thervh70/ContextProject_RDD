///<reference path="../main/DatabaseAdapter.ts"/>

describe("A DatabaseAdapter", function() {
    let adapter: DatabaseAdapter;

    beforeEach(function() {
        jasmine.Ajax.install();

        adapter = new DatabaseAdapter("http://localhost:8000");
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

    it("correctly saves the url with trailing slash", function() {
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
});
