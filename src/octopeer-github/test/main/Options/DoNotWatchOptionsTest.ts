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
        [{doNotWatchCommentElements: true}, [
            esbFactory.findElementSelectionBehaviourData(ElementID.CONFIRM_INLINE_COMMENT),
            esbFactory.findElementSelectionBehaviourData(ElementID.CREATE_PR_COMMENT),
            esbFactory.findElementSelectionBehaviourData(ElementID.EDIT_COMMENT),
        ]],
    ];

    const eventTestList: any[][] = [
        [{}, []],
        [{doNotWatchOnScreenEvents: true}, [
            eebFactory.findElementEventBindingData(EventID.SCROLL_INTO_VIEW),
            eebFactory.findElementEventBindingData(EventID.SCROLL_OUT_OF_VIEW),
        ]],
        [{doNotWatchHoverEvents: true}, [
            eebFactory.findElementEventBindingData(EventID.MOUSE_ENTER),
            eebFactory.findElementEventBindingData(EventID.MOUSE_LEAVE),
        ]],
        [{doNotWatchKeyboardShortcutEvents: true}, [eebFactory.findElementEventBindingData(EventID.KEYSTROKE)]],
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
        spyOn(Options, "get").and.callFake(function(optionName: string) {
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
