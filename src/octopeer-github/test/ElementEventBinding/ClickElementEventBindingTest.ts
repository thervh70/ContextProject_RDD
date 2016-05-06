/// <reference path="../../main/ElementEventBinding/ClickElementEventBinding.ts"/>
/// <reference path="../../main/ElementSelectionBehaviour/ButtonsElementSelectionBehaviour.ts"/>
/// <reference path="../../main/DatabaseAdaptable/DatabaseConsoleLogOnly.ts"/>

describe("An EventBinder that binds Click events", function() {
    let selector: ElementSelectionBehaviour;
    let database: DatabaseAdaptable;
    let logSpy: jasmine.Spy;

    beforeEach(function () {
        setFixtures("<div><button id='bt1' class='btn'></button><button id='bt2' class='btn2'></button></div>");
        database = new DatabaseConsoleLogOnly();
        selector = new ButtonsElementSelectionBehaviour(database);
        logSpy = spyOn(database, "log");
    });

    it("should be bound to the right type of buttons", function() {
        const binder = new ClickElementEventBinding(selector);
        $(".btn").click();
        expect(logSpy).toHaveBeenCalledTimes(1);
        delete binder;
    });
});
