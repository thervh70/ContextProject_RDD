/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the MouseLeaveElementEventBinding class.
 */

describe("A MouseLeaveElementEventBinding's", function() {
    const factory = new ElementSelectionBehaviourFactory();

    it("type should be retrieved when the getEventType function is called", function() {
        selector = factory.create(database, ElementID.PR_PARTICIPANT);
        binder = new MouseLeaveElementEventBinding(selector);
        expect(binder.getEventType()).toBe("mouseleave");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = factory.create(database, ElementID.COMMENT_TEXTFIELD);
        binder = new MouseLeaveElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(203));
    });
});
