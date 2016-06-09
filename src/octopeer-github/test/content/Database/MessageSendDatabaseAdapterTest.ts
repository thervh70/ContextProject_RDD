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
        MSDAdapter.post(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify(data));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post keystroke data to any database by calling the post method successfully", function () {
        let data = EventFactory.keystroke("duck", 0, 0);
        MSDAdapter.post(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify(data));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post mouse position data to any database by calling the post method successfully", function () {
        let data = EventFactory.mousePosition(0, 1, 0, 1);
        MSDAdapter.post(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify(data));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post mouse click data to any database by calling the post method successfully", function () {
        let data = EventFactory.mouseClick(0);
        MSDAdapter.post(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify(data));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post mouse scroll data to any database by calling the post method successfully", function () {
        let data = EventFactory.mouseScroll(0, 1, 0);
        MSDAdapter.post(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify(data));
        expect(spyObj).toHaveBeenCalled();
    });

    it("should post window resolution data to any database by calling the post method successfully", function () {
        let data = EventFactory.windowResolution(0, 1, 0);
        MSDAdapter.post(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify(data));
        expect(spyObj).toHaveBeenCalled();
    });
});
