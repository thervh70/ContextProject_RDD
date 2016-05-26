/// <reference path="../../main/DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="../../main/DatabaseAdaptable/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="../../content/ElementEventBinding/ClickElementEventBinding.ts"/>\
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>

describe("An EventBinder that binds Click events", function() {
    let selector: ElementSelectionBehaviour;
    let database: DatabaseAdaptable;
    let logSpy: jasmine.Spy;

    beforeEach(function () {
        setFixtures("<div><button id='bt1' class='js-merge-branch-action'></button><button id='bt2' class='btn2'></button></div>");
        database = new ConsoleLogDatabaseAdapter();
        selector = new MergePRButtonElementSelectionBehaviour(database);
        logSpy = spyOn(database, "postSemantic");
    });

    it("should be bound to the right type of buttons", function() {
        const binder = new ClickElementEventBinding(selector);
        $(".js-merge-branch-action").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        delete binder;
    });
});
