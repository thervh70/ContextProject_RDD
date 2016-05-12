/// <reference path="../../main/DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="../../main/DatabaseAdaptable/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>

describe("An ElementSelector that selects Buttons", function() {
    let selector: ElementSelectionBehaviour;
    let database: DatabaseAdaptable;
    let logSpy: jasmine.Spy;

    beforeEach(function() {
        setFixtures("<div><button id='bt1' class='testplaceholder'></button><button id='bt2' class='btn2'></button></div>");
        database = new ConsoleLogDatabaseAdapter();
        selector = new MergePRButtonElementSelectionBehaviour(database);
        logSpy = spyOn(database, "post");
    });

    it("should select buttons", function () {
        expect(selector.getElements().length).toBe(1);
    });

    it("has a callback that should post to the database", function () {
        const mockedClick = $.Event("click");
        selector.getCallback(new EventID(1))(mockedClick);
        expect(logSpy).toHaveBeenCalled();
    });
});
