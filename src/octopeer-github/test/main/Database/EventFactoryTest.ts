/**
 * Created by Maarten on 31-05-2016.
 */
describe("An EventFactory", function() {

    const defaultTime: UnixTimestamp = EventFactory.getTime();

    it("should properly create SemanticEvents", function() {
        expect(EventFactory.semantic(ElementID.MERGE_PR, EventID.CLICK, undefined, undefined, defaultTime))
            .toEqual({
                data: {commit_hash: undefined, created_at: defaultTime, elementID: ElementID.MERGE_PR, eventID: EventID.CLICK,
                    filename: undefined, line_number: undefined},
                type: "SemanticEvent",
            });
    });

    it("should properly create SemanticEvents with the optional fields set", function() {
        expect(EventFactory.semantic(ElementID.MERGE_PR, EventID.CLICK, "0123456789abcdef", "testfile.txt", 42, defaultTime))
            .toEqual({
                data: {commit_hash: "0123456789abcdef", created_at: defaultTime, elementID: ElementID.MERGE_PR, eventID: EventID.CLICK,
                    filename: "testfile.txt", line_number: 42},
                type: "SemanticEvent",
            });
    });

    it("should properly create KeystrokeEvents without Timestamp", function() {
        expect(EventFactory.keystroke("q", KeystrokeType.KEY_DOWN).data)
            .toEqual(jasmine.objectContaining({keystroke: "q", keystroke_type: KeystrokeType.KEY_DOWN}));
    });

    it("should properly create KeystrokeEvents with keyDown", function() {
        expect(EventFactory.keyDown("q", defaultTime))
            .toEqual({
                data: {created_at: defaultTime, keystroke: "q", keystroke_type: KeystrokeType.KEY_DOWN},
                type: "KeystrokeEvent",
            });
    });

    it("should properly create KeystrokeEvents with keyUp", function() {
        expect(EventFactory.keyUp("q", defaultTime))
            .toEqual({
                data: {created_at: defaultTime, keystroke: "q", keystroke_type: KeystrokeType.KEY_UP},
                type: "KeystrokeEvent",
            });
    });

    it("should properly create HTMLPageEvents", function() {
        const randomHTMLstring = "<html><head><title>Random yay!</title></head><body></body></html>";
        expect(EventFactory.htmlPage(randomHTMLstring, defaultTime))
            .toEqual({
                data: {created_at: defaultTime, dom: randomHTMLstring},
                type: "HTMLPageEvent",
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

    it("should properly create TabChangeEvent", function() {
        expect(EventFactory.tabChange(defaultTime))
            .toEqual({
                data: {created_at: defaultTime},
                type: "TabChangeEvent",
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
