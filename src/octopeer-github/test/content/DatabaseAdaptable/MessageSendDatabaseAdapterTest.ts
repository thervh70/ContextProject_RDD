/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the MessageSendDatabaseAdapter class.
 */

describe("A MessageSendDatabaseAdapter", function() {
    let data: IEventObject;
    let MSDAdapter: DatabaseAdaptable;
    let spy: jasmine.Spy;
    let spyObj: jasmine.Spy;

    it("should post data to any database by calling the post method successfully", function () {
        MSDAdapter = new MessageSendDatabaseAdapter();
        spy = spyOn(chrome.runtime, "sendMessage");
        spyObj = jasmine.createSpy("success");
        data = new EventObject(defaultElementID, defaultEventID, new Date().getTime(), 42);
        MSDAdapter.post(data, spyObj, EMPTY_CALLBACK);

        expect(spy).toHaveBeenCalledWith(JSON.stringify(data));
        expect(spyObj).toHaveBeenCalled();
    });
});
