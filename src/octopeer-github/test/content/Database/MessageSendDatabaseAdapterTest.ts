/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the MessageSendDatabaseAdapter class.
 */

describe("A MessageSendDatabaseAdapter", function() {
    let MSDAdapter: DatabaseAdaptable;
    let spy: jasmine.Spy;
    let spyObj: jasmine.Spy;

    beforeEach(function() {
        MSDAdapter = new MessageSendDatabaseAdapter();
        spy = spyOn(chrome.runtime, "sendMessage");
        spyObj = jasmine.createSpy("success");
    });

    it("should post data to any database by calling the post method successfully", function () {
        let data = EventFactory.semantic(defaultElementID, defaultEventID);
        MSDAdapter.postSemantic(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify({data, type: "postSemantic"}));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post keystroke data to any database by calling the post method successfully", function () {
        let data = EventFactory.keystroke("duck", 0, 0);
        MSDAdapter.postKeystroke(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify({data, type: "postKeystroke"}));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post mouse position data to any database by calling the post method successfully", function () {
        let data = EventFactory.mousePosition(0, 1, 0, 1);
        MSDAdapter.postMousePosition(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify({data, type: "postMousePosition"}));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post mouse click data to any database by calling the post method successfully", function () {
        let data = EventFactory.mouseClick(0);
        MSDAdapter.postMouseClick(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify({data, type: "postMouseClick"}));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post mouse scroll data to any database by calling the post method successfully", function () {
        let data = EventFactory.mouseScroll(0, 1, 0);
        MSDAdapter.postMouseScroll(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify({data, type: "postMouseScroll"}));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post window resolution data to any database by calling the post method successfully", function () {
        let data = EventFactory.windowResolution(0, 1, 0);
        MSDAdapter.postWindowResolution(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify({data, type: "postWindowResolution"}));
        expect(spyObj).toHaveBeenCalled();
    });
});
