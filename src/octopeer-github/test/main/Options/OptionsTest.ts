/**
 * Created by Robin and Mitchell on 24-5-2016.
 * Behaviour unit tests for the Options class.
 */

describe("The Options class", function() {

    let spySyncStorage: jasmine.Spy;
    let controller: MainController;
    let spyNotify: jasmine.Spy;

    let mockedStorageObject: { [key: string]: boolean; } = {
        [this.LOGGING]:         true,
        [this.MOUSE_HOVER]:     true,
        [this.MOUSE_CLICK]:     true,
        [this.MOUSE_SCROLLING]: true,
        [this.MOUSE_POSITION]:  true,
        [this.DATA_COMMENTS]:   true,
        [this.DATA_KEYSTROKES]: true,
        [this.DATA_HTML]:       false,
        [this.DATA_TABS]:       true,
        [this.DATA_RESOLUTION]: true,
    };

    let mockedStorageDiffValues: { [key: string]: any; } = {
        [this.LOGGING]: { newValue: true, oldValue: false },
    };

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

    it("should get the option value", function() {
        let optionList: string[] = Options.generateOptionList();
        // HashFile is false by default.
        let turnedOff = 7;
        for (let i = 0; i < optionList.length; i++) {
            if (i !== turnedOff) {
                expect(Options.get(optionList[i])).toBe(true);
            } else {
                expect(Options.get(optionList[turnedOff])).toBe(false);
            }
        }
    });

    it("should return false for a bad weather (non-existing) option value", function() {
        expect(Options.get("Hi there!")).toBe(false);
    });

    it("should generate a list of its options", function() {
        expect(Options.generateOptionList()).toEqual(["loggingEnabled", "mouseHover",
            "mouseClick", "mouseScrolling", "mousePosition", "dataComments",
            "dataKeystrokes", "dataHTML", "dataTabs",
            "dataResolution"]);
    });

    it("should be able to synchronize the optionMap when a storage object with different (boolean) option values is given", function() {
        spyNotify = spyOn(Options, "notifyObservers");
        Options.syncOptionMap(mockedStorageObject);

        for (let key in mockedStorageObject) {
            if (mockedStorageObject.hasOwnProperty(key)) {
                expect(mockedStorageObject[key]).toEqual(Options.get(key));
            }
        }
        expect(spyNotify).toHaveBeenCalled();
    });

    it("should be able to synchronize the optionMap with a storage containing an object with an old and a new value", function() {
        spyNotify = spyOn(Options, "notifyObservers");
        Options.syncOptionMap(mockedStorageDiffValues);

        expect(Options.get(Options.LOGGING)).toBe(true);
        expect(spyNotify).toHaveBeenCalled();
    });
    
    
});
