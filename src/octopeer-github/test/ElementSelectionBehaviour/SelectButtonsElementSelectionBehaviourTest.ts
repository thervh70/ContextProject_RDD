/// <reference path="../../main/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../main/DatabaseAdaptable/DatabaseConsoleLogOnly.ts"/>

describe("An ElementSelector that selects Buttons", function() {
    let selector: ElementSelectionBehaviour;
    let database: DatabaseAdaptable;
    let logSpy: jasmine.Spy;

    beforeEach(function() {
        setFixtures("<div><button id='bt1' class='testplaceholder'></button><button id='bt2' class='btn2'></button></div>");
        database = new DatabaseConsoleLogOnly();
        selector = new MergePRButtonElementSelectionBehaviour(database);
        logSpy = spyOn(database, "log");
    });

    it("should select buttons", function () {
        expect(selector.getElements().length).toBe(1);
    });

    it("has a callback that should log to the database", function () {
        const mockedClick = $.Event("click");
        selector.getCallback(new EventID(1))(mockedClick);
        expect(logSpy).toHaveBeenCalled();
    });
});
