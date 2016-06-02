/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the MouseEnterElementEventBinding class.
 */

describe("A MouseEnterElementEventBinding's", function() {
    const factory = new ElementSelectionBehaviourFactory();

    it("type should be retrieved when the getEventType function is called", function() {
        selector = factory.create(database, ElementID.OTHER_CONTRIBUTOR);
        binder = new MouseEnterElementEventBinding(selector);
        expect(binder.getEventType()).toBe("mouseenter");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = factory.create(database, ElementID.PR_CREATOR);
        binder = new MouseEnterElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(202));
    });
});
