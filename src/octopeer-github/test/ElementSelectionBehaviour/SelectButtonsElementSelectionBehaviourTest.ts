/// <reference path="../../main/ElementSelectionBehaviour/SelectButtonsElementSelectionBehaviour.ts"/>
/// <reference path="../../main/DatabaseAdaptable/DatabaseConsoleLogOnly.ts"/>

describe("An ElementSelector that selects Buttons", function() {
    let selector: ElementSelectionBehaviour;
    let database: DatabaseAdaptable;
    let logSpy: jasmine.Spy;

    beforeEach(function() {
        database = new DatabaseConsoleLogOnly();
        selector = new SelectButtonsElementSelectionBehaviour(database);
        logSpy = spyOn(database, "log");
        setFixtures("<div><button id='bt1' class='btn'></button><button id='bt2' class='btn2'></button></div>");
    });

    it("should select buttons", function () {
        expect(selector.getElements().length).toBe(1);
    });

    it("has a callback that should log to the database", function () {
        const mockedClick = $.Event("click");
        selector.getCallback(1)(mockedClick);
        expect(logSpy).toHaveBeenCalled();
    });
});
