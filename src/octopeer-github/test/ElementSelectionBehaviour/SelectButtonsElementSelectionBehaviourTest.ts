/// <reference path="../../main/ElementSelectionBehaviour/ButtonsElementSelectionBehaviour.ts"/>
/// <reference path="../../main/DatabaseAdaptable/ConsoleLogDatabaseAdapter.ts"/>

describe("An ElementSelector that selects Buttons", function() {
    let selector: ElementSelectionBehaviour;
    let database: DatabaseAdaptable;
    let logSpy: jasmine.Spy;

    beforeEach(function() {
        setFixtures("<div><button id='bt1' class='btn'></button><button id='bt2' class='btn2'></button></div>");
        database = new ConsoleLogDatabaseAdapter();
        selector = new ButtonsElementSelectionBehaviour(database);
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
