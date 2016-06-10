/// <reference path="../../../main/Database/DatabaseAdaptable.ts"/>
/// <reference path="../../../main/Database/ConsoleLogDatabaseAdapter.ts"/>

/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ClickElementEventBinding class.
 */


describe("A GenericElementEventBinding", function() {
    const esbFactory = new ElementSelectionBehaviourFactory();
    const eebFactory = new ElementEventBindingFactory();
    let binder: ElementEventBinding;
    let database: DatabaseAdaptable;
    let selector: ElementSelectionBehaviour;
    let logSpy: jasmine.Spy;

    beforeEach(function () {
        setFixtures("<div><button id='bt1' class='js-merge-branch-action'></button><button id='bt2' class='btn2'></button></div>");
        database = new ConsoleLogDatabaseAdapter();
        selector = esbFactory.create(database, ElementID.MERGE_PR);
        binder = eebFactory.create(selector, EventID.CLICK);
        logSpy = spyOn(database, "post");
    });

    it("should be bound to the right type of buttons", function() {
        binder.addDOMEvent();
        $(".js-merge-branch-action").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        delete binder;
    });

    it("should be unbound from the buttons when removeDOMEvent is called", function() {
        binder.addDOMEvent();
        binder.removeDOMEvent();
        $(".js-merge-branch-action").click();
        expect(logSpy).not.toHaveBeenCalled();
        delete binder;
    });

    it("should return the right type when the getEventType function is called", function() {
        expect(binder.getEventType()).toBe("click");
    });

    it("should return the right ID when the getEventID function is called", function() {
        expect(binder.getEventID()).toEqual(EventID.CLICK);
    });

    it("addDOMEvent and removeDOMEvent function should be overridden when given another one", function() {
        const consoleSpy = spyOn(console, "log");

        binder = new GenericElementEventBinding(selector, {
            addDOMEvent: (elementSelectionBehaviour: ElementSelectionBehaviour) => {
                console.log(elementSelectionBehaviour);
            },
            eventID: new EventID(0),
            name: "testevent",
            removeDOMEvent: () => {
                console.log("removed from DOM");
            },
        });

        binder.addDOMEvent();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        binder.removeDOMEvent();
        expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
});
