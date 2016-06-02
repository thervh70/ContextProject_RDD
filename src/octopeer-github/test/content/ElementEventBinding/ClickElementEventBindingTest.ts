/// <reference path="../../../main/Database/DatabaseAdaptable.ts"/>
/// <reference path="../../../main/Database/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="../../../content/ElementEventBinding/ClickElementEventBinding.ts"/>\

/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ClickElementEventBinding class.
 */

let binder: ElementEventBinding;
let database: DatabaseAdaptable;
let selector: ElementSelectionBehaviour;

describe("An EventBinder that binds Click events", function() {
    const esbFactory = new ElementSelectionBehaviourFactory();
    const eebFactory = new ElementEventBindingFactory();
    let logSpy: jasmine.Spy;

    beforeEach(function () {
        setFixtures("<div><button id='bt1' class='js-merge-branch-action'></button><button id='bt2' class='btn2'></button></div>");
        database = new ConsoleLogDatabaseAdapter();
        selector = esbFactory.create(database, ElementID.MERGE_PR);
        logSpy = spyOn(database, "postSemantic");
    });

    it("should be bound to the right type of buttons", function() {
        binder = eebFactory.create(selector, EventID.CLICK);
        $(".js-merge-branch-action").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        delete binder;
    });
});

describe("A ClickElementEventBinding's", function() {

    it("type should be retrieved when the getEventType function is called", function() {
        selector = esbFactory.create(database, ElementID.CREATE_INLINE_COMMENT);
        binder = eebFactory.create(selector, EventID.CLICK);
        expect(binder.getEventType()).toBe("click");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = esbFactory.create(database, ElementID.CONFIRM_INLINE_COMMENT);
        binder = eebFactory.create(selector, EventID.CLICK);
        expect(binder.getEventID()).toEqual(new EventID(201));
    });
});
