import Spy = jasmine.Spy;
/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ScrollIntoViewElementEventBinding class.
 */

const esbFactory = new ElementSelectionBehaviourFactory();
const eebFactory = new ElementEventBindingFactory();

let binder: ElementEventBinding;
let database: DatabaseAdaptable = new ConsoleLogDatabaseAdapter();
let selector: ElementSelectionBehaviour;

describe("A ScrollIntoViewElementEventBinding's", function() {
    it("type should be retrieved when the getEventType function is called", function() {
        selector = esbFactory.create(database, ElementID.INLINE_COMMENT_TEXTFIELD);
        binder = eebFactory.create(selector, EventID.SCROLL);
        expect(binder.getEventType()).toBe("scroll:finish");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = esbFactory.create(database, ElementID.PR_CREATOR);
        binder = eebFactory.create(selector, EventID.SCROLL);
        expect(binder.getEventID()).toEqual(new EventID(300));
    });
});

describe("A semantic ScrollEvent should be logged", function () {
    let spy: Spy;

    beforeEach(function () {
        loadFixtures("scroll.html");
        spy = spyOn(database, "post");
    });

    afterEach(function () {
        binder.removeDOMEvent();
    });

    it("addDOMEvent callback should be executed when initialized (esb in viewport)", function() {
        selector = esbFactory.create(database, ElementID.CONVERSATION_TAB);
        binder = eebFactory.create(selector, EventID.SCROLL);
        binder.addDOMEvent();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("addDOMEvent callback should be executed on firing of a scroll:finish event (esb out viewport)", function() {
        selector = esbFactory.create(database, ElementID.MERGE_PR);
        binder = eebFactory.create(selector, EventID.SCROLL);
        binder.addDOMEvent();
        expect(spy).not.toHaveBeenCalled();
        selector.getElements().css("margin-top", "0px");
        $(window).trigger("scroll:finish");
        expect(spy).toHaveBeenCalledTimes(1);
        selector.getElements().css("margin-top", "5000px");
        $(window).trigger("scroll:finish");
        expect(spy).toHaveBeenCalledTimes(2);
    });
});
