/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    let fakeOptions: any;

    interface DNWOTestTuple extends Array<any> {
        0: string;
        1: any[][];
        2: (e: any) => boolean;
    }

    const elementTestList: any[][] = [
        [{}, []],
        [{doNotWatchCommentElements: true}, [ElementID.CONFIRM_INLINE_COMMENT, ElementID.CREATE_PR_COMMENT, ElementID.EDIT_COMMENT]],
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
        ["element", elementTestList, (e) => DoNotWatchOptions.shouldElementBeWatched(e)],
        ["event", eventTestList, (e) => DoNotWatchOptions.shouldEventBeWatched(e)],
        ["combination", combinationTestList, (e) => DoNotWatchOptions.shouldCombinationBeWatched(e)],
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
                for (let e of tuple[1]) {
                    expect(typeTuple[2](e)).toEqual(false);
                }
                // TODO: for (all other ESBs, EEBs, Combinations) { expect(...).toEqual(true) } (done after #95: ESB lists)
            });
        }
    }

});
