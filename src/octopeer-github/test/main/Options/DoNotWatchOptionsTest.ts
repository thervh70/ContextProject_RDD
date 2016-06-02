/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    let fakeOptions: any;

    interface DNWOTestTuple extends Array<any> {
        0: string;
        1: any[][];
        2: () => void;
    }

    const elementTestList: any[][] = [
        [{}, []],
        [{doNotWatchCommentElements: true}, [CommentInlineCommentButtonElementSelectionBehaviour,
            CommentPRButtonElementSelectionBehaviour, EditCommentButtonElementSelectionBehaviour]],
    ];

    const eventTestList: any[][] = [
        [{}, []],
        [{doNotWatchOnScreenEvents: true}, [ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]],
        [{doNotWatchHoverEvents: true}, [MouseEnterElementEventBinding, MouseLeaveElementEventBinding]],
        [{doNotWatchKeyboardShortcutEvents: true}, [KeystrokeElementEventBinding]],
    ];

    const combinationTestList: any[][] = [
        [{}, []],
    ];

    const testList: DNWOTestTuple[] = [
        ["element", elementTestList, () => DoNotWatchOptions.getElements()],
        ["event", eventTestList, () => DoNotWatchOptions.getEvents()],
        ["combination", combinationTestList, () => DoNotWatchOptions.getCombinations()],
    ];

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

    for (let typeTuple of testList) {
        for (let tuple of typeTuple[1]) {
            it(`should return ${tuple[1].length} ${typeTuple[0]}s when Options are set to ${tuple[0]}`, function() {
                fakeOptions = tuple[0];
                expect(typeTuple[2]()).toBeDefined();
                expect(typeTuple[2]()).toEqual(tuple[1]);
            });
        }
    }

});
