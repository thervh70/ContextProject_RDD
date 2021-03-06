/// <reference path="../../../content/ElementSelectionBehaviour/ElementSelectionBehaviourFactory.ts"/>
/**
 * Created by Mathias on 2016-05-31.
 */
describe("An ElementSelectionBehaviourFactory", function () {

    const esbFactory = new ElementSelectionBehaviourFactory();
    const database = new ConsoleLogDatabaseAdapter();

    it("should create ElementSelectionBehaviours", function () {
        let esb = <GenericElementSelectionBehaviour> esbFactory.create(database, ElementID.ADD_EMOTICON);

        expect(esb.getData().name).toEqual("Add emoticon");
        expect(esb.getElementID()).toEqual(ElementID.ADD_EMOTICON);
    });

    it("should return null when a non-existing ElementID is given to the create function", function () {
        let esb = esbFactory.create(database, new ElementID(-1));
        expect(esb).toEqual(null);
    });

    it("should find the proper ESBData when given an ElementID", function () {
        let esb = esbFactory.findElementSelectionBehaviourData(ElementID.MERGE_PR);

        expect(esb.elementID.getElementID()).toEqual(ElementID.MERGE_PR.getElementID());
    });
});

