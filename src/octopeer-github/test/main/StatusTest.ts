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
        spy = spyOn(Status, "set");
    });

    it("to error, should call the set method with StatusCode error", function () {
        Status.error();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.ERROR);
    });

    it("to running, should call the set method with StatusCode running", function () {
        Status.running();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.RUNNING);
    });

    it("to off, should call the set method with StatusCode running", function () {
        Status.off();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.OFF);
    });

    it("to standby, should call the set method with StatusCode standby", function () {
        Status.standby();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(StatusCode.STANDBY);
    });
});

describe("The Status, when set", function() {

    it("by the set function, should call helper method setter with the given status, if Octopeer is allowed to log", function () {
        let spyOptions = spyOn(Options, "getLogging").and.returnValue(true);
        let spySetter = spyOn(Status, "setter");
        let statusCode = StatusCode.ERROR;
        Status.set(statusCode);
        expect(spyOptions).toHaveBeenCalled();
        expect(spySetter).toHaveBeenCalledWith(statusCode);
    });

    it("by the set function, should call helper method setter with the StatusCode off, if Octopeer is not allowed to log", function () {
        let spyOptions = spyOn(Options, "getLogging").and.returnValue(false);
        let spySetter = spyOn(Status, "setter");
        Status.set(StatusCode.ERROR);
        expect(spyOptions).toHaveBeenCalled();
        expect(spySetter).toHaveBeenCalledWith(StatusCode.OFF);
    });

});

describe("The Status, chrome ", function() {

    it("the helper method 'setter' should update the new status by setting properties of chrome.", function () {
        // spies that use the mocked chrome functions.
        const spyRT = spyOn(chrome.runtime, "sendMessage");
        const spyLST = spyOn(chrome.storage.local, "set");
        const spyBA = spyOn(chrome.browserAction, "setIcon");
        const spyLog = spyOn(Options, "getLogging").and.returnValue(false);
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
            path: "img/icon/off19.png",
        });
    });
});
