/**
 * Created by Mitchell on 23-5-2016.
 * Behaviour unit tests for the Status class.
 */

describe("The Status, when getIcon is called", function() {

    // getIcon tests
    it("should return the path of the 'off' icon by default", function () {
        expect(Status.getIcon()).toBe("img/icon/off.png");
    });

    it("should return the path of the 'running' icon when the status code is 'running'", function () {
        expect(Status.getIcon(StatusCode.RUNNING)).toBe("img/icon/running.png");
    });

    it("should return the path of the 'error' icon when the status code is 'error'", function () {
        expect(Status.getIcon(StatusCode.ERROR)).toBe("img/icon/error.png");
    });

    it("should return the path of the 'standby' icon when the status code is 'standby'", function () {
        expect(Status.getIcon(StatusCode.STANDBY)).toBe("img/icon/standby.png");
    });

    it("should return the path of the un icon when the status code is 'off'", function () {
        expect(Status.getIcon(StatusCode.OFF, 19)).toBe("img/icon/off19.png");
    });
});

describe("The Status, when the state is changed", function() {

    let spy: jasmine.Spy;

    beforeEach(function() {
        spy = spyOn(Status, "set").and.callThrough();
    });

    it("to error, should call the set method with StatusCode error", function () {
        Status.error();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.ERROR);
        expect(Status.isStatus(StatusCode.ERROR)).toBe(true);
    });

    it("to running, should call the set method with StatusCode running", function () {
        Status.running();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.RUNNING);
        expect(Status.isStatus(StatusCode.RUNNING)).toBe(true);
    });

    it("to off, should call the set method with StatusCode running", function () {
        Status.off();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.OFF);
        expect(Status.isStatus(StatusCode.OFF)).toBe(true);
    });

    it("to standby, should call the set method with StatusCode standby", function () {
        Status.standby();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.STANDBY);
        expect(Status.isStatus(StatusCode.STANDBY)).toBe(true);
    });
});

describe("The Status, when set", function() {
    it("by the set function, should set its internal variable to off, if Octopeer is not allowed to log", function () {
        let spyOptions = spyOn(Options, "get").and.returnValue(false);
        Status.set(StatusCode.ERROR);
        expect(spyOptions).toHaveBeenCalled();
        expect(Status.isStatus(StatusCode.OFF));
    });

    it("by the set function, should set its internal variable the requested variable, if Octopeer is allowed to log", function () {
        let spyOptions = spyOn(Options, "get").and.returnValue(true);
        Status.set(StatusCode.ERROR);
        expect(spyOptions).toHaveBeenCalled();
        expect(Status.isStatus(StatusCode.ERROR));
    });

    it("by the helper method 'setter' should update the new status by setting new properties with functions of chrome.", function () {
        // spies that use the mocked chrome functions.
        const spyRT = spyOn(chrome.runtime, "sendMessage");
        const spyLST = spyOn(chrome.storage.local, "set");
        const spyBA = spyOn(chrome.browserAction, "setIcon");
        const spyLog = spyOn(Options, "get").and.returnValue(false);
        const line = "Octopeer is turned off.";
        const path = "img/icon/off.png";
        Status.set(StatusCode.ERROR);

        expect(spyLog).toHaveBeenCalled();

        expect(spyRT).toHaveBeenCalled();
        expect(spyRT).toHaveBeenCalledWith({
            line: line,
            path: path,
        });
        expect(spyLST).toHaveBeenCalled();
        expect(spyLST).toHaveBeenCalledWith({
            line: line,
            path: path,
        });
        expect(spyBA).toHaveBeenCalled();
        expect(spyBA).toHaveBeenCalledWith({
            path: "resources/img/icon/off19.png",
        });
    });
});
