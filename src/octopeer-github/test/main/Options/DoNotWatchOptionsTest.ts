/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    let fakeOptions: any;

    beforeEach(function() {
        // reset the mocked options before every test
        fakeOptions = {};
        spyOn(Options, "getOption").and.callFake(function(optionName: string) {
            if (fakeOptions[optionName] === undefined) {
                return false;
            } else {
                return fakeOptions[optionName];
            }
        });
    });

    it("should return elements that should not be watched, when comment elements is switched on", function () {
        fakeOptions.doNotWatchCommentElements = true;
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([CommentInlineCommentButtonElementSelectionBehaviour,
            CommentPRButtonElementSelectionBehaviour, EditCommentButtonElementSelectionBehaviour]);
    });

    it("should return elements that should not be watched, when comment elements is switched off", function () {
        fakeOptions.doNotWatchCommentElements = false;
        expect(DoNotWatchOptions.getElements()).toBeDefined();
        expect(DoNotWatchOptions.getElements()).toEqual([]);
    });

    it("should return events that should not be watched, when on screen events are switched on", function () {
        fakeOptions.doNotWatchOnScreenEvents = true;
        fakeOptions.doNotWatchHoverEvents = false;
        fakeOptions.doNotWatchKeyboardShortcutEvents = false;
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]);
    });

    it("should return events that should not be watched, when the on screen events are switched on", function () {
        fakeOptions.doNotWatchOnScreenEvents = false;
        fakeOptions.doNotWatchHoverEvents = true;
        fakeOptions.doNotWatchKeyboardShortcutEvents = false;
        expect(DoNotWatchOptions.getEvents()).toBeDefined();
        expect(DoNotWatchOptions.getEvents()).toEqual([MouseEnterElementEventBinding, MouseLeaveElementEventBinding]);
    });

    it("should return events that should not be watched, when the keyboard shortcut events are switched on", function () {
        fakeOptions.doNotWatchOnScreenEvents = false;
        fakeOptions.doNotWatchHoverEvents = false;
        fakeOptions.doNotWatchKeyboardShortcutEvents = true;
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
