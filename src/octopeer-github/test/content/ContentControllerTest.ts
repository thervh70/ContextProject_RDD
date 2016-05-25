/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ContentController class.
 */

describe("The ContentController", function() {
    let spy: jasmine.Spy;
    let testContentController: ContentController;

    const propertyListOne = [
        ClickElementEventBinding,
        KeystrokeElementEventBinding,
        MouseEnterElementEventBinding,
        MouseLeaveElementEventBinding,
        ScrollIntoViewElementEventBinding,
        ScrollOutOfViewElementEventBinding,
    ];

    const propertyListTwo = [
        AddEmoticonButtonElementSelectionBehaviour,
        CancelEditPRNameButtonElementSelectionBehaviour,
        CancelInlineCommentButtonElementSelectionBehaviour,
        CheckDetailButtonElementSelectionBehaviour,
        ClosePRButtonElementSelectionBehaviour,
        CommentInlineCommentButtonElementSelectionBehaviour,
        CommentPRButtonElementSelectionBehaviour,
        EditCommentButtonElementSelectionBehaviour,
        EditPRNameButtonElementSelectionBehaviour,
        InlineCommentButtonElementSelectionBehaviour,
        MergePRButtonElementSelectionBehaviour,
        SaveEditPRNameButtonElementSelectionBehaviour,
        ShowChecksToggleButtonElementSelectionBehaviour,
        DateMiscellaneousElementSelectionBehaviour,
        CommitHashcodeNameElementSelectionBehaviour,
        CommitMessageNameElementSelectionBehaviour,
        OtherContributerNameElementSelectionBehaviour,
        PRCreatorNameElementSelectionBehaviour,
        PRParticipantNameElementSelectionBehaviour,
        AssigneeSettingElementSelectionBehaviour,
        LabelSettingElementSelectionBehaviour,
        LockConversationSettingElementSelectionBehaviour,
        MilestoneSettingElementSelectionBehaviour,
        UnsubscribeSettingElementSelectionBehaviour,
        CommitsTabHeaderElementSelectionBehaviour,
        ConversationTabHeaderElementSelectionBehaviour,
        FilesChangedTabHeaderElementSelectionBehaviour,
    ];

    beforeEach(function() {
        testContentController = new ContentController();
    });

    it("should return an initialized (content)controller, with the right properties, by calling the start function", function () {
        spy = spyOn(testContentController, "connectToBackgroundPage");
        testContentController.start();

        expect(spy).toHaveBeenCalled();
        // checks whether the object contains the right properties.
        expect(testContentController.start()).toEqual(jasmine.objectContaining({
            elementEventBindingList: propertyListOne,
            elementSelectionBindingList: propertyListTwo,
            messageSendDatabaseAdapter : new MessageSendDatabaseAdapter(),
        }));
    });
});
