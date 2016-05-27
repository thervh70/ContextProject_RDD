/// <reference path="../../../main/Database/DatabaseAdaptable.ts"/>
/// <reference path="../../../main/Database/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="../../../content/ElementEventBinding/ClickElementEventBinding.ts"/>\
/// <reference path="../../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>

/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ClickElementEventBinding class.
 */

let binder: ElementEventBinding;
let database: DatabaseAdaptable;
let selector: ElementSelectionBehaviour;

describe("An EventBinder that binds Click events", function() {
    let logSpy: jasmine.Spy;

    beforeEach(function () {
        setFixtures("<div><button id='bt1' class='js-merge-branch-action'></button><button id='bt2' class='btn2'></button></div>");
        database = new ConsoleLogDatabaseAdapter();
        selector = new MergePRButtonElementSelectionBehaviour(database);
        logSpy = spyOn(database, "postSemantic");
    });

    it("should be bound to the right type of buttons", function() {
        binder = new ClickElementEventBinding(selector);
        $(".js-merge-branch-action").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        delete binder;
    });
});

describe("A ClickElementEventBinding's", function() {

    it("type should be retrieved when the getEventType function is called", function() {
        selector = new InlineCommentButtonElementSelectionBehaviour(database);
        binder = new ClickElementEventBinding(selector);
        expect(binder.getEventType()).toBe("click");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = new CommentInlineCommentButtonElementSelectionBehaviour(database);
        binder = new ClickElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(201));
    });
});
