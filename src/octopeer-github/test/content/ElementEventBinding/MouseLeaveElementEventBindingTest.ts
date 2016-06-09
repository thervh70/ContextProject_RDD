/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the MouseLeaveElementEventBinding class.
 */

describe("A MouseLeaveElementEventBinding's", function() {
    const esbFactory = new ElementSelectionBehaviourFactory();
    const eebFactory = new ElementEventBindingFactory();

    let binder: ElementEventBinding;
    let database: DatabaseAdaptable;
    let selector: ElementSelectionBehaviour;

    it("type should be retrieved when the getEventType function is called", function() {
        selector = esbFactory.create(database, ElementID.PR_PARTICIPANT);
        binder = eebFactory.create(selector, EventID.MOUSE_LEAVE);
        expect(binder.getEventType()).toBe("mouseleave");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = esbFactory.create(database, ElementID.COMMENT_TEXTFIELD);
        binder = eebFactory.create(selector, EventID.MOUSE_LEAVE);
        expect(binder.getEventID()).toEqual(new EventID(203));
    });
});
