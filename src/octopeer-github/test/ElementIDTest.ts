/**
 * Created by Youri on 08/05/2016.
 */
const numericalValueforElementID = 4; // randomly chosen.

describe("An Identifier for an element", function() {
    let elementID: ElementID;

    it("should return the value of instantiation", function () {
        elementID = new ElementID(numericalValueforElementID);
        expect(elementID.getElementID()).toBe(numericalValueforElementID);
    });
});
