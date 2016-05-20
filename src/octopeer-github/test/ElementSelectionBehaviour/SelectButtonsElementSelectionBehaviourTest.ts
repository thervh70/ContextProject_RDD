/* tslint:disable */
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
/* tslint:enable */

interface CreatableNumberPair extends Array<ElementSelectionBehaviourCreatable | number> {
    0: ElementSelectionBehaviourCreatable;
    1: number;
}

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

const htmlsList = [
    "Conversation_tab.html",
    "Commit_tab.html",
    "Files_changed_tab.html",
];

const selectorListsList = [
    conversationSelectors,
    commitSelectors,
    filesChangedSelectors,
];

function functionName(fun: ElementSelectionBehaviourCreatable) {
    let ret = fun.toString();
    ret = ret.substr("function ".length);
    ret = ret.substr(0, ret.indexOf("("));
    return ret;
}

let databaseSpy: jasmine.Spy;
jasmine.getFixtures().fixturesPath = "base/src/octopeer-github/test/resources";

for (let i = 0; i < htmlsList.length; i++) {
    const htmlFile = htmlsList[i];
    const selectors = selectorListsList[i];

    // console.log(selectors);
    for (let j = 0; j < selectors.length; j++) {
        const selectorCreatable = selectors[j][0];
        describe("An ElementSelector that selects Buttons " + functionName(selectorCreatable) + " at " + htmlFile, function () {
            const database = new ConsoleLogDatabaseAdapter();
            const selector = new selectorCreatable(database);

            beforeEach(function () {
                // console.log(selectors[j]);
                // console.log(selector);
                databaseSpy = spyOn(database, "post");
                loadFixtures(htmlFile);
            });

            it("should select only one button", function () {
                // console.log(selector);
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
