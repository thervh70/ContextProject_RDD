/**
 * Created by Maarten on 24-05-2016.
 */

describe("The URLHandler", function() {

    describe("should, while formatting URLs,", function() {
        it("add a trailing slash to a url", function () {
            const url = "http://localhost:8000";
            expect(URLHandler.formatUrl(url)).toEqual(url + "/");
        });

        it("not add a trailing slash to a url when it is already there", function () {
            const url = "http://localhost:8000/";
            expect(URLHandler.formatUrl(url)).toEqual(url);
        });
    });

    it("should correctly get the session id from a URL", function () {
        expect(URLHandler.getSessionFromUrl("http://localhost:8000/api/users/42/")).toEqual(42);
    });

    describe("should, while checking if a URL is from a PR,", function() {
        const testURL = "https://github.com/thervh70/ContextProject_RDD/pull/7";
        const suffices = ["", "/", "/files", "#event-666986359"];
        const messages = [
            "without a trailing slash",
            "with a trailing slash",
            "when in the files tab",
            "when linked to a specific event",
        ];
        for (let i = 0; i < suffices.length; i++) {
            it("be correct " + messages[i], function () {
                const url = testURL + suffices[i];
                expect(URLHandler.isPullRequestUrl(url)).toEqual([
                    url, "thervh70", "ContextProject_RDD", "7",
                ]);
            });
        }
    });

});
