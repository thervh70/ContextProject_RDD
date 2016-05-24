/**
 * Created by Maarten on 24-05-2016.
 */

describe("The URLHandler", function() {

    describe("should, while formatting URLs,", function() {
        it("add a trailing slash to a url", function () {
            const url = "http://localhost:8000";
            expect(URLHandler.formatUrl(url)).toBe(url + "/");
        });

        it("not add a trailing slash to a url when it is already there", function () {
            const url = "http://localhost:8000/";
            expect(URLHandler.formatUrl(url)).toBe(url);
        });
    });

});
