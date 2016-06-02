/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ScrollOutOfViewElementEventBinding class.
 */

describe("A ScrollOutOfViewElementEventBinding's", function() {
    const esbFactory = new ElementSelectionBehaviourFactory();
    const eebFactory = new ElementEventBindingFactory();

    it("type should be retrieved when the getEventType function is called", function() {
        selector = esbFactory.create(database, ElementID.CONFIRM_EDIT_COMMENT);
        binder = eebFactory.create(selector, EventID.SCROLL_OUT_OF_VIEW);
        expect(binder.getEventType()).toBe("scrolloutofview");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = esbFactory.create(database, ElementID.CANCEL_EDIT_COMMENT);
        binder = eebFactory.create(selector, EventID.SCROLL_OUT_OF_VIEW);
        expect(binder.getEventID()).toEqual(new EventID(302));
    });
});
