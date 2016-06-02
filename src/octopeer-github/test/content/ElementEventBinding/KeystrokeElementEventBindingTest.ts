/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the KeystrokeElementEventBinding class.
 */

describe("A KeystrokeElementEventBinding's", function() {
    const factory = new ElementSelectionBehaviourFactory();

    it("type should be retrieved when the getEventType function is called", function() {
        selector = factory.create(database, ElementID.CANCEL_INLINE_COMMENT);
        binder = new KeystrokeElementEventBinding(selector);
        expect(binder.getEventType()).toBe("keystroke");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = factory.create(database, ElementID.OTHER_CONTRIBUTOR);
        binder = new KeystrokeElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(101));
    });
});
