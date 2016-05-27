/**
 * Created by Mitchell on 26-5-2016.
 * Behaviour unit tests for the MainController class.
 */

let testMainController: MainController;

describe("The MainController, when started by the start function,", function() {
    let spyConnectCS: jasmine.Spy;
    let spyStandby: jasmine.Spy;
    let spyOptionsInit: jasmine.Spy;
    let spyOptionsUpdate: jasmine.Spy;
    let spyOptionsObserver: jasmine.Spy;

    beforeEach(function () {
        testMainController = new MainController();
        spyStandby = spyOn(Status, "standby");
        spyOptionsInit = spyOn(Options, "init");
        spyOptionsUpdate = spyOn(Options, "update");
        spyOptionsObserver = spyOn(Options, "addObserver");
    });

    it("should call the right functions", function () {
        spyConnectCS = spyOn(testMainController, "connectToContentScript");
        testMainController.start();

        expect(spyConnectCS).toHaveBeenCalled();
        expect(spyStandby).toHaveBeenCalled();
        expect(spyOptionsInit).toHaveBeenCalled();
        expect(spyOptionsUpdate).toHaveBeenCalled();
        expect(spyOptionsObserver).toHaveBeenCalled();
        expect(spyOptionsObserver).toHaveBeenCalledWith(testMainController);
    });

    it("should return the right object", function () {
        spyConnectCS = spyOn(testMainController, "connectToContentScript");
        testMainController.start();

        // checks whether the object contains the right properties (only contains a spy).
        expect(testMainController.start()).toEqual(jasmine.objectContaining({
            connectToContentScript: spyConnectCS,
        }));
    });

    let spyInitCurTabs: jasmine.Spy;
    let spyRehookOnUpdate: jasmine.Spy;
    let spyRehookOnFocus: jasmine.Spy;
    let spyListenDBMessages: jasmine.Spy;

    it("the connectToContentScript helper method, should call the right functions", function () {
        spyInitCurTabs = spyOn(testMainController, "initAllCurrentTabs");
        spyRehookOnUpdate = spyOn(testMainController, "rehookOnUpdate");
        spyRehookOnFocus = spyOn(testMainController, "rehookOnFocusChange");
        spyListenDBMessages = spyOn(testMainController, "listenToDatabaseMessages");
        testMainController.start();

        expect(spyInitCurTabs).toHaveBeenCalled();
        expect(spyRehookOnUpdate).toHaveBeenCalled();
        expect(spyRehookOnFocus).toHaveBeenCalled();
        expect(spyListenDBMessages).toHaveBeenCalled();
    });

    it("the initAllCurrentTabs helper method, should call the right functions", function () {
        const spyChrome = spyOn(chrome.tabs, "query");
        spyRehookOnUpdate = spyOn(testMainController, "rehookOnUpdate");
        spyRehookOnFocus = spyOn(testMainController, "rehookOnFocusChange");
        spyListenDBMessages = spyOn(testMainController, "listenToDatabaseMessages");
        testMainController.start();

        expect(spyChrome).toHaveBeenCalled();
        expect(spyRehookOnUpdate).toHaveBeenCalled();
        expect(spyRehookOnFocus).toHaveBeenCalled();
        expect(spyListenDBMessages).toHaveBeenCalled();
    });

    it("the rehookOnUpdate helper method, should call the right functions", function () {
        const spyChrome = spyOn(chrome.tabs.onUpdated, "addListener");
        spyInitCurTabs = spyOn(testMainController, "initAllCurrentTabs");
        spyRehookOnFocus = spyOn(testMainController, "rehookOnFocusChange");
        spyListenDBMessages = spyOn(testMainController, "listenToDatabaseMessages");
        testMainController.start();

        expect(spyChrome).toHaveBeenCalled();
        expect(spyInitCurTabs).toHaveBeenCalled();
        expect(spyRehookOnFocus).toHaveBeenCalled();
        expect(spyListenDBMessages).toHaveBeenCalled();
    });

    it("the rehookOnFocusChange helper method, should call the right functions", function () {
        const spyChrome = spyOn(chrome.tabs.onActivated, "addListener");
        spyInitCurTabs = spyOn(testMainController, "initAllCurrentTabs");
        spyRehookOnUpdate = spyOn(testMainController, "rehookOnUpdate");
        spyListenDBMessages = spyOn(testMainController, "listenToDatabaseMessages");
        testMainController.start();

        expect(spyChrome).toHaveBeenCalled();
        expect(spyInitCurTabs).toHaveBeenCalled();
        expect(spyRehookOnUpdate).toHaveBeenCalled();
        expect(spyListenDBMessages).toHaveBeenCalled();
    });

    it("the listenToDatabaseMessages helper method, should call the right functions", function () {
        const spyChrome = spyOn(chrome.runtime.onMessage, "addListener");
        spyInitCurTabs = spyOn(testMainController, "initAllCurrentTabs");
        spyRehookOnUpdate = spyOn(testMainController, "rehookOnUpdate");
        spyRehookOnFocus = spyOn(testMainController, "rehookOnFocusChange");
        testMainController.start();

        expect(spyChrome).toHaveBeenCalled();
        expect(spyInitCurTabs).toHaveBeenCalled();
        expect(spyRehookOnFocus).toHaveBeenCalled();
        expect(spyListenDBMessages).toHaveBeenCalled();
    });

});

describe("The MainController", function() {

    it("should, when notify is being called, notify the current tab", function () {
        testMainController = new MainController();
        const spyChrome = spyOn(chrome.tabs, "query");
        testMainController.notify();

        expect(spyChrome).toHaveBeenCalled();
    });

});
