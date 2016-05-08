/**
 * Created by Youri on 08/05/2016.
 */
const numericalValueforEventID = 4; // randomly chosen.

describe("An Idenfifier for an event", function() {
    let eventID: EventID;

    it("should return the value of instantiation", function () {
        eventID = new EventID(numericalValueforEventID);
        expect(eventID.getEventID).toBe(numericalValueforEventID);
    });
});
