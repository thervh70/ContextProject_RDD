/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the KeystrokeElementEventBinding class.
 */

describe("A KeystrokeElementEventBinding's", function() {

    it("type should be retrieved when the getEventType function is called", function() {
        selector = new CancelInlineCommentButtonElementSelectionBehaviour(database);
        binder = new KeystrokeElementEventBinding(selector);
        expect(binder.getEventType()).toBe("keystroke");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = new OtherContributerNameElementSelectionBehaviour(database);
        binder = new KeystrokeElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(101));
    });
});
