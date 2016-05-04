/// <reference path="../main/main.ts"/>

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(new Derp(42, 40).height).toBe(42);
    });
});
