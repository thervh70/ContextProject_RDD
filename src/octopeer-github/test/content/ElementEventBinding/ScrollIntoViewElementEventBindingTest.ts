/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ScrollIntoViewElementEventBinding class.
 */

describe("A ScrollIntoViewElementEventBinding's", function() {
    const factory = new ElementSelectionBehaviourFactory();

    it("type should be retrieved when the getEventType function is called", function() {
        selector = factory.create(database, ElementID.INLINE_COMMENT_TEXTFIELD);
        binder = new ScrollIntoViewElementEventBinding(selector);
        expect(binder.getEventType()).toBe("scrollintoview");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = factory.create(database, ElementID.PR_CREATOR);
        binder = new ScrollIntoViewElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(301));
    });
});
