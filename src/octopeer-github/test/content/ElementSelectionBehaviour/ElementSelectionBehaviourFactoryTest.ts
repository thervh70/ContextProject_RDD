/// <reference path="../../../content/ElementSelectionBehaviour/ElementSelectionBehaviourFactory.ts"/>
/**
 * Created by Mathias on 2016-05-31.
 */
describe("An ElementSelectionBehaviourFactory", function () {

    const elementSelectionBehaviourFactory = new ElementSelectionBehaviourFactory();
    // const database = new ConsoleLogDatabaseAdapter();
    const unsortedList = unsortedElementSelectionBehaviourData;

    it("should sort the ElementSelectionBehaviourData list.", function () {
        let sortedList = elementSelectionBehaviourFactory.getElementSelectionBehaviourData();
        let data: ElementSelectionBehaviourData;
        let i = 0;

        expect(unsortedList.length === sortedList.length);
        for (data of sortedList) {
            // No such thing as Array.prototype.contains
            expect(unsortedList.indexOf(data) >= 0);
        }

        for (i = 0; i < sortedList.length - 1; i++) {
            expect(sortedList[i].elementID < sortedList[i + 1].elementID);
        }
    });

    // it("should create ElementSelectionBehaviours", function () {
    //     expect(equals(elementSelectionBehaviourFactory.create(database, ElementID.ADD_EMOTICON)
    //         .getData, ($.grep(unsortedList, function (e: ElementSelectionBehaviourData) {
    //             return e.elementID === ElementID.ADD_EMOTICON;
    //         }))));
    // });
});

