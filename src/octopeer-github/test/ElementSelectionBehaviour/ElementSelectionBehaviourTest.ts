/* tslint:disable:max-line-length */
/// <reference path="../../main/DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="../../main/DatabaseAdaptable/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/AbstractElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/AddEmoticonButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelEditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CheckDetailButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ClosePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CommentInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CommentPRButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/InlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/SaveEditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ShowChecksToggleButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/MiscellaneousElementSelectionBehaviour/DateMiscellaneousElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/NameElementSelectionBehaviour/CommitHashcodeNameElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/NameElementSelectionBehaviour/CommitMessageNameElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/NameElementSelectionBehaviour/OtherContributerNameElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/NameElementSelectionBehaviour/PRCreatorNameElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/NameElementSelectionBehaviour/PRParticipantNameElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/SettingElementSelectionBehaviour/AssigneeSettingElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/SettingElementSelectionBehaviour/LabelSettingElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/SettingElementSelectionBehaviour/LockConversationSettingElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/SettingElementSelectionBehaviour/MilestoneSettingElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/SettingElementSelectionBehaviour/UnsubscribeSettingElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/CommitsTabHeaderElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/ConversationTabHeaderElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/FilesChangedTabHeaderElementSelectionBehaviour.ts"/>
/* tslint:enable:max-line-length */

/**
 * Interface that enforces a tuple (ElementSelectionBehaviourCreatable, number).
 * The 0 and 1 are the indices of this tuple (since it is created as a list).
 * The tuple is used to test the ElementSelectionBehaviour classes. Each Creatable has
 * a number of times its ElementSelectionBehaviour appears in the html files that are used
 * to test the classes.
 */
interface CreatableNumberPair extends Array<ElementSelectionBehaviourCreatable | number> {
    0: ElementSelectionBehaviourCreatable;
    1: number;
}

/**
 * There are three different lists containing CreatableNumberPairs. Each list conforms to an html file.
 * This html file contains [number] instantiations of the [ElementSelectionBehaviourCreateable]. This is used
 * in the parameterized test to test whether the right amount of Elements are detected in the html files.
 * @type {CreatableNumberPair[]}
 */
// TODO: All commented tuples in the lists have to be fixed with Ajax request first
let conversationSelectors: CreatableNumberPair[] =  [
    [AddEmoticonButtonElementSelectionBehaviour, 2],
    [CancelEditPRNameButtonElementSelectionBehaviour, 0],
    [CheckDetailButtonElementSelectionBehaviour, 2],
    [ClosePRButtonElementSelectionBehaviour, 1],
    [CommentPRButtonElementSelectionBehaviour, 1],
    [EditCommentButtonElementSelectionBehaviour, 2],
    [EditPRNameButtonElementSelectionBehaviour, 1],
    [MergePRButtonElementSelectionBehaviour, 1],
    [SaveEditPRNameButtonElementSelectionBehaviour, 0],
    [ShowChecksToggleButtonElementSelectionBehaviour, 1],
    [DateMiscellaneousElementSelectionBehaviour, 8],
    [CommitHashcodeNameElementSelectionBehaviour, 4],
    [CommitMessageNameElementSelectionBehaviour, 4],
    // [OtherContributerNameElementSelectionBehaviour, 0],
    // [PRCreatorNameElementSelectionBehaviour, 3],
    // [PRParticipantNameElementSelectionBehaviour, 4],
    [AssigneeSettingElementSelectionBehaviour, 1],
    [LabelSettingElementSelectionBehaviour, 1],
    [LockConversationSettingElementSelectionBehaviour, 1],
    [MilestoneSettingElementSelectionBehaviour, 1],
    [UnsubscribeSettingElementSelectionBehaviour, 1],
    [CommitsTabHeaderElementSelectionBehaviour, 1],
    [ConversationTabHeaderElementSelectionBehaviour, 1],
    [FilesChangedTabHeaderElementSelectionBehaviour, 1],
];

let commitSelectors: CreatableNumberPair[] = [
    [CancelEditPRNameButtonElementSelectionBehaviour, 0],
    [EditPRNameButtonElementSelectionBehaviour, 1],
    [SaveEditPRNameButtonElementSelectionBehaviour, 0],
    [DateMiscellaneousElementSelectionBehaviour, 4],
    [CommitHashcodeNameElementSelectionBehaviour, 4],
    [CommitMessageNameElementSelectionBehaviour, 4],
    // [OtherContributerNameElementSelectionBehaviour, 0],
    // [PRCreatorNameElementSelectionBehaviour, 4],
    // [PRParticipantNameElementSelectionBehaviour, 0],
    [CommitsTabHeaderElementSelectionBehaviour, 1],
    [ConversationTabHeaderElementSelectionBehaviour, 1],
    [FilesChangedTabHeaderElementSelectionBehaviour, 1],
];

let filesChangedSelectors: CreatableNumberPair[] = [
    [AddEmoticonButtonElementSelectionBehaviour, 1],
    [CancelEditPRNameButtonElementSelectionBehaviour, 0],
    // [CancelInlineCommentButtonElementSelectionBehaviour, 0],
    // [CommentInlineCommentButtonElementSelectionBehaviour, 0],
    [EditCommentButtonElementSelectionBehaviour, 1],
    [EditPRNameButtonElementSelectionBehaviour, 1],
    // [InlineCommentButtonElementSelectionBehaviour, 0],
    [SaveEditPRNameButtonElementSelectionBehaviour, 0],
    [DateMiscellaneousElementSelectionBehaviour, 5],
    // [OtherContributerNameElementSelectionBehaviour, 0],
    // [PRCreatorNameElementSelectionBehaviour, 0],
    // [PRParticipantNameElementSelectionBehaviour, 1],
    [CommitsTabHeaderElementSelectionBehaviour, 1],
    [ConversationTabHeaderElementSelectionBehaviour, 1],
    [FilesChangedTabHeaderElementSelectionBehaviour, 1],
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

/**
 * This is a list of the different CreatableNumberPairLists that are used to test the classes.
 * selectorListsList[x] corresponds with htmlList[x].
 * @type {CreatableNumberPair[][]} A list of CreatableNummberPairs that indicates which Elements should be present how many times
 */
const selectorListsList = [
    conversationSelectors,
    commitSelectors,
    filesChangedSelectors,
];

/**
 * Strips the Creatables, so only the name remains. Used for logging the test name.
 * @param fun An ElementSelectionBehaviourCreatable that has to be stripped down to its name.
 * @returns {string} The name of the given Creatable.
 */
function functionName(fun: ElementSelectionBehaviourCreatable) {
    let ret = fun.toString();
    ret = ret.substr("function ".length);
    ret = ret.substr(0, ret.indexOf("("));
    return ret;
}

let databaseSpy: jasmine.Spy;
jasmine.getFixtures().fixturesPath = "base/src/octopeer-github/test/resources";

/**
 * Every htmlFile is paired with the corresponding CreatableNumberPairList. The Creatables in the list
 * have an expected amount of times they should appear in the html file. These are tested against their actual
 * number of appearances. Besides these tests, it is also tested whether the database was called to log the data.
 */
for (let i = 0; i < htmlsList.length; i++) {
    const htmlFile = htmlsList[i];
    const selectors = selectorListsList[i];

    for (let j = 0; j < selectors.length; j++) {
        const selectorCreatable = selectors[j][0];
        describe("A " + functionName(selectorCreatable) + " that selects Elements at " + htmlFile, function () {
            const database = new ConsoleLogDatabaseAdapter();
            const selector = new selectorCreatable(database);

            beforeEach(function () {
                databaseSpy = spyOn(database, "post");
                loadFixtures(htmlFile);
            });

            it("should select " + selector[j][1] + " Elements.", function () {
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
