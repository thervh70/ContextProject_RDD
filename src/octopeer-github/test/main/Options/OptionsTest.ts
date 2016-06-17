/// <reference path="../../../main/Array.ts"/>

/**
 * Created by Robin and Mitchell on 24-5-2016.
 * Behaviour unit tests for the Options class.
 */

describe("The Options class", function() {

    let spySyncStorage: jasmine.Spy;
    let controller: MainController;
    let spyNotify: jasmine.Spy;

    let mockedStorageObject: { [key: string]: boolean; } = {
        [Options.LOGGING]:         true,
        [Options.MOUSE_HOVER]:     true,
        [Options.MOUSE_CLICK]:     true,
        [Options.MOUSE_SCROLLING]: false,
        [Options.MOUSE_POSITION]:  true,
        [Options.DATA_COMMENTS]:   true,
        [Options.DATA_KEYSTROKES]: true,
        [Options.DATA_HTML]:       false,
        [Options.DATA_TABS]:       true,
        [Options.DATA_RESOLUTION]: true,
    };

    let mockedStorageDiffValues: { [key: string]: any; } = {
        [Options.LOGGING]: { newValue: true, oldValue: false },
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
        // Some options are false by default.
        let turnedOff = [3, 7];
        for (let i = 0; i < optionList.length; i++) {
            if (!(turnedOff.contains(i))) {
                expect(Options.get(optionList[i])).toBe(true);
            } else {
                expect(Options.get(optionList[i])).toBe(false);
            }
        }
    });

    it("should return false for a bad weather (non-existing) option value", function() {
        expect(Options.get("Hi there!")).toBe(false);
    });


    it("should get the default value of an option", function() {
        expect(Options.getDefault(Options.LOGGING)).toBe(true);
    });

    it("should return false for a bad weather (non-existing) default option value", function() {
        expect(Options.getDefault("badWeather")).toBe(false);
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

    it("should be able to generate a current option map, based on the general option map", function() {
        expect(Options.generateCurrentOptionMap()).toEqual(mockedStorageObject);
    });

    it("should be able to generate a default option map, based on the general option map", function() {
        expect(Options.generateDefaultOptionMap()).toEqual(mockedStorageObject);
    });

    describe("regarding circular dependencies, ", function() {
        function recursivelyTopologicallyRemove(list: [string, string][]): boolean {

            // no items, so no circular dependancy so we aprove.
            if (list.length === 0) {
                return true;
            }

            // see if we can find a item wich is not relied on.
            for (let begin = 0; begin < list.length; begin++) {

                // check if there's nothing relying on this.
                if (nothingIsDependentOn(list[begin][0], list)) {

                    // recursively continue without this element.
                    list.splice(begin, 1);
                    return recursivelyTopologicallyRemove(list);
                }
            }

            // found nothing to remove, so a circular reference is found.
            return false;
        }

        // for a given element see if there are no items wich reference it.
        function nothingIsDependentOn(element: string, list: [string, string][]) {

            // loop through all items
            for (let begin = 0; begin < list.length; begin++) {

                // if a item is found wich relies on this element, return false
                if (list[begin][1] === element) {
                    return false;
                }
            }

            // nothing found, so approve.
            return true;
        }

        let a = "a", b = "b", c = "c", d = "d", e = "e", f = "f";

        // now for testing the functions used in the test
        it("should be so that an empty mapping gets approved", function() {
            expect(recursivelyTopologicallyRemove([])).toBe(true);
        });

        it("should be so that a non circular mapping gets approved", function() {
            expect(recursivelyTopologicallyRemove([
                [a, b],
                [b, c],
                [c, d],
                [e, f],
            ])).toBe(true);
        });

        it("should be so that a circular mapping gets rejected", function() {
            expect(recursivelyTopologicallyRemove([
                [a, b],
                [b, c],
                [c, d],
                [c, a],
                [e, f],
            ])).toBe(false);
        });

        it("should be so that a simple circular mapping gets rejected", function() {
            expect(recursivelyTopologicallyRemove([
                [a, a],
            ])).toBe(false);
        });

        it("should be the case that there are no circular dependencies specified in the Options", function() {
            expect(
                recursivelyTopologicallyRemove(
                    $.map(Options.DEPENDENCIES, (value, index) => [[index, value]])
                )
            ).toEqual(true);
        });
    });
});
