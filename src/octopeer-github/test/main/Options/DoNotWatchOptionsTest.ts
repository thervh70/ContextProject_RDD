/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    it("should return elements that should not be watched, when comment elements is switched on", function () {
        spyOn(Options, "getDoNotWatchCommentElements").and.returnValue(true);
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([
            esbFactory.findElementSelectionBehaviourData(ElementID.CONFIRM_INLINE_COMMENT),
            esbFactory.findElementSelectionBehaviourData(ElementID.CREATE_PR_COMMENT),
            esbFactory.findElementSelectionBehaviourData(ElementID.EDIT_COMMENT),
        ]);
    });

    it("should return elements that should not be watched, when comment elements is switched off", function () {
        spyOn(Options, "getDoNotWatchCommentElements").and.returnValue(false);
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([]);
    });

    it("should return events that should not be watched, when on screen events are switched on", function () {
        spyOn(Options, "getDoNotWatchOnScreenEvents").and.returnValue(true);
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([
            eebFactory.findElementEventBindingData(EventID.SCROLL_INTO_VIEW),
            eebFactory.findElementEventBindingData(EventID.SCROLL_OUT_OF_VIEW),
        ]);
    });

    it("should return events that should not be watched, when the on screen events are switched on", function () {
        spyOn(Options, "getDoNotWatchHoverEvents").and.returnValue(true);
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([
            eebFactory.findElementEventBindingData(EventID.MOUSE_ENTER),
            eebFactory.findElementEventBindingData(EventID.MOUSE_LEAVE),
        ]);
    });

    it("should return events that should not be watched, when the keyboard shortcut events are switched on", function () {
        spyOn(Options, "getDoNotWatchKeyboardShortcutEvents").and.returnValue(true);
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([eebFactory.findElementEventBindingData(EventID.KEYSTROKE)]);
    });

    it("should return events that should not be watched, when all events options are switched off", function () {
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([]);
    });

    it("should return combinations that should not be watched, yet a placeholder", function () {
        expect(DoNotWatchOptions.getCombinations()).toBeDefined();
        expect(DoNotWatchOptions.getCombinations()).toEqual([]);
    });
});
