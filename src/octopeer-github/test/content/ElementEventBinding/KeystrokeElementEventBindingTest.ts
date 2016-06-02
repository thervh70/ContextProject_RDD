/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the KeystrokeElementEventBinding class.
 */

describe("A KeystrokeElementEventBinding's", function() {
    const esbFactory = new ElementSelectionBehaviourFactory();
    const eebFactory = new ElementEventBindingFactory();

    it("type should be retrieved when the getEventType function is called", function() {
        selector = esbFactory.create(database, ElementID.CANCEL_INLINE_COMMENT);
        binder = eebFactory.create(selector, EventID.KEYSTROKE);
        expect(binder.getEventType()).toBe("keystroke");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = esbFactory.create(database, ElementID.OTHER_CONTRIBUTOR);
        binder = eebFactory.create(selector, EventID.KEYSTROKE);
        expect(binder.getEventID()).toEqual(new EventID(101));
    });
});
