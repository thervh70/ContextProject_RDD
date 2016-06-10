/**
 * Created by Maarten on 31-05-2016.
 */
describe("An EventFactory", function() {

    const defaultTime: UnixTimestamp = EventFactory.getTime();

    it("should properly create SemanticEvents", function() {
        expect(EventFactory.semantic(ElementID.MERGE_PR, EventID.CLICK, undefined, undefined, defaultTime))
            .toEqual({
                data: {created_at: defaultTime, elementID: ElementID.MERGE_PR, eventID: EventID.CLICK,
                    filename: undefined, lineNumber: undefined},
                type: "SemanticEvent",
            });
    });

    it("should properly create SemanticEvents with the optional fields set", function() {
        expect(EventFactory.semantic(ElementID.MERGE_PR, EventID.CLICK, "testfile.txt", 42, defaultTime))
            .toEqual({
                data: {created_at: defaultTime, elementID: ElementID.MERGE_PR, eventID: EventID.CLICK,
                    filename: "testfile.txt", lineNumber: 42},
                type: "SemanticEvent",
            });
    });

    it("should properly create KeystrokeEvents", function() {
        expect(EventFactory.keystroke("q", defaultTime, defaultTime + 100))
            .toEqual({
                data: {key_down_at: defaultTime, key_up_at: defaultTime + 100, keystroke: "q"},
                type: "KeystrokeEvent",
            });
    });

    it("should properly create MouseClickEvents", function() {
        expect(EventFactory.mouseClick(defaultTime))
            .toEqual({
                data: {created_at: defaultTime},
                type: "MouseClickEvent",
            });
    });

    it("should properly create MousePositionEvents", function() {
        expect(EventFactory.mousePosition(1, 2, 3, 4, defaultTime))
            .toEqual({
                data: {created_at: defaultTime, position_x: 1, position_y: 2, viewport_x: 3, viewport_y: 4},
                type: "MousePositionEvent",
            });
    });

    it("should properly create MouseScrollEvents", function() {
        expect(EventFactory.mouseScroll(1, 2, defaultTime))
            .toEqual({
                data: {created_at: defaultTime, viewport_x: 1, viewport_y: 2},
                type: "MouseScrollEvent",
            });
    });

    it("should properly create WindowResolutionEvents", function() {
        expect(EventFactory.windowResolution(1, 2, defaultTime))
            .toEqual({
                data: {created_at: defaultTime, height: 2, width: 1},
                type: "WindowResolutionEvent",
            });
    });

});
