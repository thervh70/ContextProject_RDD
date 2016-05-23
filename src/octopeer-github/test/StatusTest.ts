/**
 * Created by Mitchell on 23-5-2016.
 */

describe("The Status", function() {

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
