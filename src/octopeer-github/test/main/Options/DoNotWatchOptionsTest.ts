/**
 * Created by Mitchell on 23-5-2016.
 * Tests the functions of the DoNotWatchOptions class.
 */

describe("The DoNotWatchOptions", function() {

    let fakeOptions: any;

    interface DNWOTestTuple extends Array<any> {
        0: string;
        1: any[][];
        2: any[];
        3: (e: any) => boolean;
    }

    const elementTestList: any[][] = [
        [{}, []],
        [{dataComments: true}, [
            ElementID.CONFIRM_INLINE_COMMENT,
            ElementID.CREATE_PR_COMMENT,
            ElementID.EDIT_COMMENT,
        ]],
    ];

    const eventTestList: any[][] = [
        [{}, []],
        [{mouseScrolling: true}, [EventID.SCROLL_INTO_VIEW, EventID.SCROLL_OUT_OF_VIEW, EventID.SCROLL]],
        [{mouseHover: true}, [EventID.MOUSE_ENTER, EventID.MOUSE_LEAVE]],
        [{mouseClick: true}, [EventID.CLICK]],
        [{dataKeystrokes: true}, [EventID.KEYSTROKE]],
    ];

    const combinationTestList: any[][] = [
        [{}, []],
    ];

    const elementList: ElementID[] = [];
    const eventList: EventID[] = [];
    const combinationList: ElementXEventID[] = [];

    for (let element of elementSelectionBehaviourDataList) {
        elementList.push(element.elementID);
        for (let event of elementEventBindingDataList) {
            combinationList.push({element: element.elementID, event: event.eventID});
        }
    }
    for (let event of elementEventBindingDataList) {
        eventList.push(event.eventID);
    }

    const testList: DNWOTestTuple[] = [
        ["element",     elementTestList,     elementList,     (e) => DoNotWatchOptions.shouldElementBeWatched(e)],
        ["event",       eventTestList,       eventList,       (e) => DoNotWatchOptions.shouldEventBeWatched(e)],
        ["combination", combinationTestList, combinationList, (e) => DoNotWatchOptions.shouldCombinationBeWatched(e)],
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
            it(`should return ${tuple[1].length} ${typeTuple[0]}s when Options are set to ${JSON.stringify(tuple[0])}`, function() {
                fakeOptions = tuple[0];
                for (let e of typeTuple[2]) {
                    // expect(DoNotWatchOptions.should*BeWatched(e).toEqual(x)
                    //      where x is true or false, depending on the lists defined above
                    expect(typeTuple[3](e)).toEqual(!tuple[1].contains(e));
                }
            });
        }
    }
});
