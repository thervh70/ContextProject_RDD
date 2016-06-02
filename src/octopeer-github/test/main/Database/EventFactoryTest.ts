/**
 * Created by Maarten on 31-05-2016.
 */
describe("An EventFactory", function() {

    const defaultTime: UnixTimestamp = new Date().getTime();

    it("should properly create SemanticEvents", function() {
        expect(EventFactory.semantic(ElementID.MERGE_PR, EventID.CLICK, defaultTime, 0))
            .toEqual({duration: 0, elementID: ElementID.MERGE_PR, eventID: EventID.CLICK, filename: undefined,
                lineNumber: undefined, start: defaultTime});
    });

    it("should properly create SemanticEvents with the optional fields set", function() {
        expect(EventFactory.semantic(ElementID.MERGE_PR, EventID.CLICK, defaultTime, 0, "testfile.txt", 42))
            .toEqual({duration: 0, elementID: ElementID.MERGE_PR, eventID: EventID.CLICK, filename: "testfile.txt",
                lineNumber: 42, start: defaultTime});
    });

    it("should properly create KeystrokeEvents", function() {
        expect(EventFactory.keystroke("q", defaultTime))
            .toEqual({keystroke: "q", timestamp: defaultTime});
    });

    it("should properly create MouseClickEvents", function() {
        expect(EventFactory.mouseClick(defaultTime))
            .toEqual({timestamp: defaultTime});
    });

    it("should properly create MousePositionEvents", function() {
        expect(EventFactory.mousePosition(1, 2, 3, 4, defaultTime))
            .toEqual({position_x: 1, position_y: 2, timestamp: defaultTime, viewport_x: 3, viewport_y: 4});
    });

    it("should properly create MouseScrollEvents", function() {
        expect(EventFactory.mouseScroll(1, 2, defaultTime))
            .toEqual({timestamp: defaultTime, viewport_x: 1, viewport_y: 2});
    });

    it("should properly create WindowResolutionEvents", function() {
        expect(EventFactory.windowResolution(1, 2, defaultTime))
            .toEqual({height: 2, timestamp: defaultTime, width: 1});
    });

});
