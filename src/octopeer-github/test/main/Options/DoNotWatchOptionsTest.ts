/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    it("should return elements that should not be watched, when comment elements is switched on", function () {
        spyOn(Options, "getDoNotWatchCommentElements").and.returnValue(true);
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([CommentInlineCommentButtonElementSelectionBehaviour,
            CreatePRCommentButtonElementSelectionBehaviour, EditCommentButtonElementSelectionBehaviour]);
    });

    it("should return elements that should not be watched, when comment elements is switched off", function () {
        spyOn(Options, "getDoNotWatchCommentElements").and.returnValue(false);
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([]);
    });

    it("should return events that should not be watched, when on screen events are switched on", function () {
        spyOn(Options, "getDoNotWatchOnScreenEvents").and.returnValue(true);
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]);
    });

    it("should return events that should not be watched, when the on screen events are switched on", function () {
        spyOn(Options, "getDoNotWatchHoverEvents").and.returnValue(true);
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([MouseEnterElementEventBinding, MouseLeaveElementEventBinding]);
    });

    it("should return events that should not be watched, when the keyboard shortcut events are switched on", function () {
        spyOn(Options, "getDoNotWatchKeyboardShortcutEvents").and.returnValue(true);
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([KeystrokeElementEventBinding]);
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
