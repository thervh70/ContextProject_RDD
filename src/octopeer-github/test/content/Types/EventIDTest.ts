/**
 * Created by Youri and Mitchell on 08/05/2016.
 * Behaviour unit tests for the EventID class.
 */
const numericalValueforEventID = 401; // randomly chosen.

describe("An Idenfifier for an event", function() {
    let eventID: EventID;

    it("should return the value of instantiation", function () {
        eventID = new EventID(numericalValueforEventID);
        expect(eventID.getEventID()).toBe(numericalValueforEventID);
    });

    it("should return a string of the eventID, when toString is called", function () {
        eventID = new EventID(numericalValueforEventID);
        expect(eventID.toString()).toBe(numericalValueforEventID.toString());
    });

    // START_WATCHING_PR and STOP_WATCHING_PR are not yet implemented as event bindings, but via the following two
    // tests way we are sure that they are connected to the right EventID.
    it("of which the binding in not yet implemented, for START_WATCHING_PR, is connected to the right EventID", function () {
        eventID = EventID.START_WATCHING_PR;
        expect(eventID.getEventID()).toBe(401);
    });

    it("of which the binding in not yet implemented, for STOP_WATCHING_PR, is connected to the right EventID", function () {
        eventID = EventID.STOP_WATCHING_PR;
        expect(eventID.getEventID()).toBe(402);
    });
});
