/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ContentController class.
 */

describe("The ContentController", function() {
    let spyAddedListeners: jasmine.Spy;
    let spyCheckListeners: jasmine.Spy;

    let testContentController: ContentController;

    const elementEventBindingList = [
        ClickElementEventBinding,
        KeystrokeElementEventBinding,
        MouseEnterElementEventBinding,
        MouseLeaveElementEventBinding,
        ScrollIntoViewElementEventBinding,
        ScrollOutOfViewElementEventBinding,
    ];

    beforeEach(function() {
        testContentController = new ContentController();
    });

    it("should return an initialized (content)controller, with the right properties, by calling the start function", function () {
        spyCheckListeners = spyOn(chrome.runtime.onMessage, "hasListeners").and.returnValue(false);
        testContentController.start();
        // Checks whether the object contains the right properties.
        expect(testContentController.start()).toEqual(jasmine.objectContaining({
            elementEventBindingList: elementEventBindingList,
            messageSendDatabaseAdapter : new MessageSendDatabaseAdapter(),
        }));
    });

    it("should return an initialized (content)controller, when no listeners are added, by calling the start function", function () {
        spyCheckListeners = spyOn(chrome.runtime.onMessage, "hasListeners").and.returnValue(false).and.callThrough();
        testContentController.start();

        expect(spyCheckListeners).toHaveBeenCalled();
    });

    it("should return an initialized (content)controller, when listeners are added, by calling the start function", function () {
        spyCheckListeners = spyOn(chrome.runtime.onMessage, "hasListeners").and.returnValue(true).and.callThrough();
        spyAddedListeners = spyOn(chrome.runtime.onMessage, "addListener").and.callThrough();
        testContentController.start();

        expect(spyCheckListeners).toHaveBeenCalled();
        expect(spyAddedListeners).toHaveBeenCalled();
    });
});
