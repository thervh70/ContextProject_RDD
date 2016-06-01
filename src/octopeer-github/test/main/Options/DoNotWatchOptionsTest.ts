/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    it("should return elements that should not be watched, when comment elements is switched on", function () {
        spyOn(Options, "getOption").and.returnValue(true);
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([CommentInlineCommentButtonElementSelectionBehaviour,
            CommentPRButtonElementSelectionBehaviour, EditCommentButtonElementSelectionBehaviour]);
    });

    it("should return elements that should not be watched, when comment elements is switched off", function () {
        spyOn(Options, "getOption").and.returnValue(false);
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([]);
    });

    it("should return events that should not be watched, when on screen events are switched on", function () {
        spyOn(Options, "getOption").and.callFake(function(optionName: string) {
            if (optionName === "doNotWatchOnScreenEvents") {
                return true;
            } else if (optionName === "doNotWatchHoverEvents" || optionName === "doNotWatchKeyboardShortcutEvents") {
                return false;
            } else {
                // else a non-existing string is used, so throw an error.
                throw EvalError;
            }
        });
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]);
    });

    it("should return events that should not be watched, when the on screen events are switched on", function () {
        spyOn(Options, "getOption").and.callFake(function(optionName: string) {
            if (optionName === "doNotWatchHoverEvents") {
                return true;
            } else if (optionName === "doNotWatchOnScreenEvents" || optionName === "doNotWatchKeyboardShortcutEvents") {
                return false;
            } else {
                // else a non-existing string is used, so throw an error.
                throw EvalError;
            }
        });
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([MouseEnterElementEventBinding, MouseLeaveElementEventBinding]);
    });

    it("should return events that should not be watched, when the keyboard shortcut events are switched on", function () {
        spyOn(Options, "getOption").and.callFake(function(optionName: string) {
            if (optionName === "doNotWatchKeyboardShortcutEvents") {
                return true;
            } else if (optionName === "doNotWatchOnScreenEvents" || optionName === "doNotWatchHoverEvents") {
                return false;
            } else {
                // else a non-existing string is used, so throw an error.
                throw EvalError;
            }
        });
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
