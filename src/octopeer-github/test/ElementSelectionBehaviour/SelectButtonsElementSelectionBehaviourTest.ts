/// <reference path="../../main/ElementSelectionBehaviour/SelectButtonsElementSelectionBehaviour.ts"/>
/// <reference path="../../main/DatabaseAdaptable/DatabaseConsoleLogOnly.ts"/>

describe("An ElementSelector that selects Buttons", function() {
    let selector: ElementSelectionBehaviour;

    beforeEach(function() {
        selector = new SelectButtonsElementSelectionBehaviour(new DatabaseConsoleLogOnly());
        setFixtures("<div><button id='bt1' class='btn'></button><button id='bt2' class='btn2'></button></div>");
    });

    it("should select buttons", function () {
        expect(selector.getElements().length).toBe(1);
    });
});
