/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the MouseEnterElementEventBinding class.
 */

describe("A MouseEnterElementEventBinding's", function() {
    const esbFactory = new ElementSelectionBehaviourFactory();
    const eebFactory = new ElementEventBindingFactory();

    let binder: ElementEventBinding;
    let database: DatabaseAdaptable;
    let selector: ElementSelectionBehaviour;

    it("type should be retrieved when the getEventType function is called", function() {
        selector = esbFactory.create(database, ElementID.OTHER_CONTRIBUTOR);
        binder = eebFactory.create(selector, EventID.MOUSE_ENTER);
        expect(binder.getEventType()).toBe("mouseenter");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = esbFactory.create(database, ElementID.PR_CREATOR);
        binder = eebFactory.create(selector, EventID.MOUSE_ENTER);
        expect(binder.getEventID()).toEqual(new EventID(202));
    });
});
