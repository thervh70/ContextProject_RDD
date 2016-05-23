/**
 * Created by Mitchell on 23-5-2016.
 */

describe("The Status", function() {

    it("should return the path of the 'off' icon by default", function () {
        expect(Status.getIcon()).toBe("img/icon/off.png");
    });
});
