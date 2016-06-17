/**
 * Created by Youri and Mitchell on 08/05/2016.
 * Behaviour unit tests for the ElementID class.
 */

describe("An Identifier for an element", function() {
    const numericalValueforElementID = 4; // randomly chosen.
    let elementID: ElementID;

    beforeEach(function() {
        elementID = new ElementID(numericalValueforElementID);
    });

    it("should return the value of instantiation", function() {
        expect(elementID.getElementID()).toBe(numericalValueforElementID);
    });

    it("should return a string of the elementID, when toString is called", function() {
        // the toBe value is a String of the Number 4.
        expect(elementID.toString()).toBe(numericalValueforElementID.toString());
    });

    it("should say that two equivalent elementIDs are equal", function() {
        expect(elementID.equals(new ElementID(numericalValueforElementID))).toBe(true);
    });

    it("should say that two different elementIDs are not equal", function() {
        expect(elementID.equals(new ElementID(numericalValueforElementID + 1))).toBe(false);
    });

    it("should return 0 for the NO_ELEMENT constant", function() {
        expect(ElementID.NO_ELEMENT.equals(new ElementID(0))).toBe(true);
    });
});
