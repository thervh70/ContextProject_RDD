/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ScrollIntoViewElementEventBinding class.
 */

describe("A ScrollIntoViewElementEventBinding's", function() {
    const esbFactory = new ElementSelectionBehaviourFactory();
    const eebFactory = new ElementEventBindingFactory();

    let binder: ElementEventBinding;
    let database: DatabaseAdaptable;
    let selector: ElementSelectionBehaviour;

    it("type should be retrieved when the getEventType function is called", function() {
        selector = esbFactory.create(database, ElementID.INLINE_COMMENT_TEXTFIELD);
        binder = eebFactory.create(selector, EventID.SCROLL_INTO_VIEW);
        expect(binder.getEventType()).toBe("scrollintoview");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = esbFactory.create(database, ElementID.PR_CREATOR);
        binder = eebFactory.create(selector, EventID.SCROLL_INTO_VIEW);
        expect(binder.getEventID()).toEqual(new EventID(301));
    });
});
