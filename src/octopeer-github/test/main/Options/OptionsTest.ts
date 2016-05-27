/**
 * Created by Robin on 24-5-2016.
 */

describe("The Options class", function() {

    let spySyncStorage: jasmine.Spy;
    let controller: MainController;
    let spyNotify: jasmine.Spy;

    beforeEach(function () {
        controller = new MainController();
        spySyncStorage = spyOn(chrome.storage.sync, "get");
        spyNotify = spyOn(controller, "notify");
        Options.init();
    });

    it("should get the storage on start", function () {
       expect(spySyncStorage).toHaveBeenCalled();
    });

    it("should correctly add an observer", function () {
        expect(Options.getObservers()).toEqual([]);
        Options.addObserver(controller);
        expect(Options.getObservers()).toEqual([controller]);
    });

    it("should remove an observer", function() {
        expect(Options.getObservers()).toEqual([]);
        Options.addObserver(controller);
        Options.removeObserver(controller);
        expect(Options.getObservers()).toEqual([]);
        Options.removeObserver(controller);
        expect(Options.getObservers()).toEqual([]);
    });

    it("should notify all its observers", function() {
        Options.addObserver(controller);
        Options.notifyObservers();
        expect(spyNotify).toHaveBeenCalled();
    });

    it("should not notify after removal", function() {
        Options.addObserver(controller);
        Options.removeObserver(controller);
        Options.notifyObservers();
        expect(spyNotify).not.toHaveBeenCalled();
    });

    it("should get the logging value", function() {
        expect(Options.getLogging()).toBe(true);
    });

    it("should get the tabs value", function() {
        expect(Options.getTabs()).toBe(true);
    });

    it("should get the comments value", function() {
        expect(Options.getComments()).toBe(true);
    });

    it("should get the peerComments value", function() {
        expect(Options.getPeerComments()).toBe(true);
    });

    it("should get the focus value", function() {
        expect(Options.getFocus()).toBe(true);
    });

    it("should get the username value", function() {
        expect(Options.getUsername()).toBe(true);
    });

    it("should get the repo value", function() {
        expect(Options.getRepo()).toBe(true);
    });

    it("should get the file value", function() {
        expect(Options.getFile()).toBe(false);
    });

    it("should get the screenevents value", function() {
        expect(Options.getDoNotWatchOnScreenEvents()).toBe(false);
    });

    it("should get the watchhover value", function() {
        expect(Options.getDoNotWatchHoverEvents()).toBe(false);
    });

    it("should get the watchcomment value", function() {
        expect(Options.getDoNotWatchCommentElements()).toBe(false);
    });

    it("should get the watchkeyboard value", function() {
        expect(Options.getDoNotWatchKeyboardShortcutEvents()).toBe(false);
    });
});
