/**
 * Created by Youri and Mitchell on 08/05/2016.
 * Behaviour unit tests for the ElementID class.
 */
const numericalValueforElementID = 4; // randomly chosen.

describe("An Identifier for an element", function() {
    let elementID: ElementID;

    beforeEach(function() {
        elementID = new ElementID(numericalValueforElementID);
    });

    it("should return the value of instantiation", function () {
        expect(elementID.getElementID()).toBe(numericalValueforElementID);
    });

    it("should return a string of the elementID, when toString is called", function () {
        // the toBe value is a String of the Number 4.
        expect(elementID.toString()).toBe(numericalValueforElementID.toString());
    });
});
