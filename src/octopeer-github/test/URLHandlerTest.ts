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

    it("should correctly get the session id from a URL", function () {
        expect(URLHandler.getSessionFromUrl("http://localhost:8000/api/users/42/")).toBe(42);
    });

    describe("should, while checking if a URL is from a PR,", function() {
        const testURL = "https://github.com/thervh70/ContextProject_RDD/pull/7";
        it("be correct", function() {
            expect(URLHandler.isPullRequestUrl(testURL)).toBe([
                testURL, "thervh70", "ContextProject_RDD", "7",
            ]);
        });

        it("be correct with a trailing slash", function() {
            const url = testURL + "/";
            expect(URLHandler.isPullRequestUrl(url)).toBe([
                url, "thervh70", "ContextProject_RDD", "7",
            ]);
        });
    });

});
