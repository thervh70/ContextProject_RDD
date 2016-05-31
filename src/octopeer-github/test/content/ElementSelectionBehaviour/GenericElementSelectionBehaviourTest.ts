/// <reference path="../../../content/ElementSelectionBehaviour/GenericElementSelectionBehaviour.ts"/>
/**
 * Created by Maarten on 31-05-2016.
 */
describe("A GenericElementSelectionBehaviour", function() {

    const CLDAdapter = new ConsoleLogDatabaseAdapter();
    let ESBData: ElementSelectionBehaviourData;
    const makeGESB = (data: ElementSelectionBehaviourData) => {
        return new GenericElementSelectionBehaviour(CLDAdapter, ESBData);
    };

    beforeEach(function() {
        setFixtures("<div id='parent'><div class='btn1'></div><div class='btn2'></div></div>");
        // Set in beforeEach because occasionally fields are added in tests
        ESBData = {
            elementID: ElementID.MERGE_PR,
            foundOnPages: PageMask.CONVERSATION,
            name: "Merge PR",
            selector: ".btn1",
        };
    });

    it("should get the correct ElementID", function() {
        expect(makeGESB(ESBData).getElementID()).toEqual(ElementID.MERGE_PR);
    });

    it("should choose the default selector when no composedSelector is specified", function() {
        expect(makeGESB(ESBData).getElements()).toEqual($(".btn1"));
    });

    it("should choose the composed selector when no composedSelector is specified", function() {
        ESBData.composedSelector = () => {
            return $(".btn1").parent();
        };
        expect(makeGESB(ESBData).getElements()).toEqual($("#parent"));
    });

    it("should choose the default callback when no callback is specified", function() {
        const databaseSpy = spyOn(CLDAdapter, "postSemantic");
        makeGESB(ESBData).getCallback(new EventID(1))($.Event("click"));
        expect(databaseSpy).toHaveBeenCalledTimes(1);
    });

    it("should choose the specified callback when it is specified", function() {
        const consoleSpy = spyOn(console, "log");
        ESBData.callback = (eventObject: JQueryEventObject) => {
            console.log(eventObject);
        };
        makeGESB(ESBData).getCallback(new EventID(42))($.Event("click"));
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

});
