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

    const elementTestList: any[][] = [
        [{}, []],
        [{doNotWatchCommentElements: true}, [CommentInlineCommentButtonElementSelectionBehaviour,
            CommentPRButtonElementSelectionBehaviour, EditCommentButtonElementSelectionBehaviour]],
    ];

    for (let tuple of elementTestList) {
        it(`should return ${tuple[1].length} elements when Options are set to ${tuple[0]}`, function() {
            fakeOptions = tuple[0];
            expect(DoNotWatchOptions.getElements()).toBeDefined();
            expect(DoNotWatchOptions.getElements()).toEqual(tuple[1]);
        });
    }

    const eventTestList: any[][] = [
        [{}, []],
        [{doNotWatchOnScreenEvents: true}, [ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]],
        [{doNotWatchHoverEvents: true}, [MouseEnterElementEventBinding, MouseLeaveElementEventBinding]],
        [{doNotWatchKeyboardShortcutEvents: true}, [KeystrokeElementEventBinding]],
    ];

    for (let tuple of eventTestList) {
        it(`should return ${tuple[1].length} events when Options are set to ${tuple[0]}`, function() {
            fakeOptions = tuple[0];
            expect(DoNotWatchOptions.getEvents()).toBeDefined();
            expect(DoNotWatchOptions.getEvents()).toEqual(tuple[1]);
        });
    }

    const combinationTestList: any[][] = [
        [{}, []],
    ];

    for (let tuple of combinationTestList) {
        it(`should return ${tuple[1].length} combinations when Options are set to ${tuple[0]}`, function() {
            fakeOptions = tuple[0];
            expect(DoNotWatchOptions.getCombinations()).toBeDefined();
            expect(DoNotWatchOptions.getCombinations()).toEqual(tuple[1]);
        });
    }

});
