/// <reference path="../../../main/Database/DatabaseAdaptable.ts"/>
/// <reference path="../../../main/Database/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="../../../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../../../content/ElementSelectionBehaviour/AbstractElementSelectionBehaviour.ts"/>

/**
 * Interface that enforces a tuple (ElementSelectionBehaviourCreatable, number).
 * The 0 and 1 are the indices of this tuple (since it is created as a list).
 * The tuple is used to test the ElementSelectionBehaviour classes. Each Creatable has
 * a number of times its ElementSelectionBehaviour appears in the html files that are used
 * to test the classes.
 */
interface ElementIDNumberPair extends Array<ElementID | number> {
    0: ElementID;
    1: number;
}

/**
 * There are three different lists containing CreatableNumberPairs. Each list conforms to an html file.
 * This html file contains [number] instantiations of the [ElementSelectionBehaviourCreateable]. This is used
 * in the parameterized test to test whether the right amount of Elements are detected in the html files.
 * @type {CreatableNumberPair[]}
 */
// TODO: All commented tuples in the lists have to be fixed with Ajax request first
let conversationSelectors: ElementIDNumberPair[] =  [
    [ElementID.ADD_EMOTICON, 2],
    [ElementID.CANCEL_EDIT_PRNAME, 0],
    [ElementID.SHOW_CI_DETAILS, 2],
    [ElementID.CLOSE_PR, 1],
    [ElementID.CREATE_PR_COMMENT, 1],
    [ElementID.EDIT_COMMENT, 2],
    [ElementID.EDIT_PR_NAME, 1],
    [ElementID.MERGE_PR, 1],
    [ElementID.SAVE_PR_NAME, 0],
    [ElementID.SHOW_CI_CHECKS_TOGGLE, 1],
    [ElementID.DATE, 8],
    [ElementID.COMMIT_HASHCODE, 4],
    [ElementID.COMMIT_NAME, 4],
    // [ElementID.OTHER_CONTRIBUTOR, 0],
    // [ElementID.PR_CREATOR, 3],
    // [ElementID.PR_PARTICIPANT, 4],
    [ElementID.ASSIGNEE, 1],
    [ElementID.LABELS, 1],
    [ElementID.LOCK_CONVERSATION, 1],
    [ElementID.MILESTONE, 1],
    [ElementID.UNSUBSCRIBE, 1],
    [ElementID.COMMITS_TAB, 1],
    [ElementID.CONVERSATION_TAB, 1],
    [ElementID.FILES_CHANGED_TAB, 1],
];

let commitSelectors: ElementIDNumberPair[] = [
    [ElementID.CANCEL_EDIT_PRNAME, 0],
    [ElementID.EDIT_PR_NAME, 1],
    [ElementID.SAVE_PR_NAME, 0],
    [ElementID.DATE, 4],
    [ElementID.COMMIT_HASHCODE, 4],
    [ElementID.COMMIT_NAME, 4],
    // [ElementID.OTHER_CONTRIBUTOR, 0],
    // [ElementID.PR_CREATOR, 4],
    // [ElementID.PR_PARTICIPANT, 0],
    [ElementID.COMMITS_TAB, 1],
    [ElementID.CONVERSATION_TAB, 1],
    [ElementID.FILES_CHANGED_TAB, 1],
];

let filesChangedSelectors: ElementIDNumberPair[] = [
    [ElementID.ADD_EMOTICON, 1],
    [ElementID.CANCEL_EDIT_PRNAME, 0],
    // [ElementID.CANCEL_INLINE_COMMENT, 0],
    // [ElementID.CONFIRM_INLINE_COMMENT, 0],
    [ElementID.EDIT_COMMENT, 1],
    [ElementID.EDIT_PR_NAME, 1],
    // [ElementID.CREATE_INLINE_COMMENT, 0],
    [ElementID.SAVE_PR_NAME, 0],
    [ElementID.DATE, 5],
    // [ElementID.OTHER_CONTRIBUTOR, 0],
    // [ElementID.PR_CREATOR, 0],
    // [ElementID.PR_PARTICIPANT, 1],
    [ElementID.COMMITS_TAB, 1],
    [ElementID.CONVERSATION_TAB, 1],
    [ElementID.FILES_CHANGED_TAB, 1],
];

/**
 * This is a list of the different html files that are used to test the classes.
 * htmlList[x] corresponds with selectorListsList[x].
 * @type {string[]} The name of the html file
 */
const htmlsList = [
    "conversation-tab.html",
    "commit-tab.html",
    "files-changed-tab.html",
];

const selectorsList = [
    conversationSelectors,
    commitSelectors,
    filesChangedSelectors,
];

/**
 * Strips the Creatables, so only the name remains. Used for logging the test name.
 * @param fun An ElementSelectionBehaviourCreatable that has to be stripped down to its name.
 * @returns {string} The name of the given Creatable.
 */
function functionName(fun: ElementSelectionBehaviourData) {
    return fun.name;
}

let databaseSpy: jasmine.Spy;
jasmine.getFixtures().fixturesPath = "base/src/octopeer-github/test/resources";

/**
 * Every htmlFile is paired with the corresponding CreatableNumberPairList. The Creatables in the list
 * have an expected amount of times they should appear in the html file. These are tested against their actual
 * number of appearances. Besides these tests, it is also tested whether the database was called to log the data.
 */

for (let i = 0; i < htmlsList.length; i++) {
    const factory = new ElementSelectionBehaviourFactory();
    const htmlFile = htmlsList[i];
    const selectors = selectorsList[i];

    for (let j = 0; j < selectors.length; j++) {
        const selectorID = selectors[j][0];
        describe("A " + functionName(factory.findElementSelectionBehaviourData(selectorID)) +
            " that selects Elements at " + htmlFile, function () {
            const database = new ConsoleLogDatabaseAdapter();
            const selector = factory.create(database, selectorID);

            beforeEach(function () {
                databaseSpy = spyOn(database, "postSemantic");
                loadFixtures(htmlFile);
            });

            it("should select " + selectors[j][1] + " Elements.", function () {
                expect(selector.getElements().length).toBe(selectors[j][1]);
            });

            it("has a callback that should post to the database", function () {
                const mockedClick = $.Event("click");
                selector.getCallback(new EventID(201))(mockedClick);
                expect(databaseSpy).toHaveBeenCalled();
            });
        });
    }
}
