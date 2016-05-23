/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    it("should return elements that should not be watched, yet undefined", function () {
        expect(DoNotWatchOptions.getElements()).not.toBeDefined();
    });

    it("should return events that should not be watched, when the focus is switched off", function () {
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([]);
    });

    it("should return combinations that should not be watched, yet undefined", function () {
        expect(DoNotWatchOptions.getCombinations()).not.toBeDefined();
    });
});
