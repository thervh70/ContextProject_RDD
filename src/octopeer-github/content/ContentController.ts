/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/KeystrokeElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/MouseEnterElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/MouseLeaveElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ScrollIntoViewElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ScrollOutOfViewElementEventBinding.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/AddEmoticonButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelEditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CheckDetailButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ClosePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CommentInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CommentPRButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/InlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/SaveEditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ShowChecksToggleButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/MiscellaneousElementSelectionBehaviour/MiscellaneousElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/MiscellaneousElementSelectionBehaviour/DateMiscellaneousElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/NameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/CommitHashcodeNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/CommitMessageNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/OtherContributerNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/PRCreatorNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/PRParticipantNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/SettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/AssigneeSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/LabelSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/LockConversationSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/MilestoneSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/UnsubscribeSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/TabHeaderElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/CommitsTabHeaderElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/ConversationTabHeaderElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/FilesChangedTabHeaderElementSelectionBehaviour.ts"/>

/**
 * The ContentController hooks the event handlers to the DOM-tree.
 */
class ContentController {

    /**
     * List of ElementEventBindings that should be matched with ElementSelectors
     */
    private elementEventBindingList = [
        ClickElementEventBinding,
        KeystrokeElementEventBinding,
        MouseEnterElementEventBinding,
        MouseLeaveElementEventBinding,
        ScrollIntoViewElementEventBinding,
        ScrollOutOfViewElementEventBinding,
    ];

    /**
     * List of ElementSelectors that should be matched with ElementEventBindings
     */
    private elementSelectionBindingList = [
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

    /**
     * An inner singleton class that implements DatabaseAdaptable in order to send messages to the background page.
     * @type {MessageSendDatabaseAdapter}
     */
    private messageSendDatabaseAdapter = new (class MessageSendDatabaseAdapter implements DatabaseAdaptable {
        public post(data: EventObject, success: Callback, failure: Callback) {
            let postData: any = data;
            postData.elementID = (<ElementID>data.elementID).getElementID();
            postData.eventID = (<EventID>data.eventID).getEventID();
            chrome.runtime.sendMessage(JSON.stringify(postData));
            success();
        }
    })();

    /**
     * Starts the ContentController. After calling this, all event handlers are hooked to the DOM-tree.
     * @return this
     */
    public start() {
        this.connectToBackgroundPage();
        return this;
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private connectToBackgroundPage() {
        const self = this;
        if (chrome.runtime.onMessage.hasListeners()) {
            return;
        }

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.hookToDom) {
                self.hookToDOM(self.messageSendDatabaseAdapter);
                sendResponse(`hooked to DOM (${location.href})`);
            } else {
                sendResponse(`did nothing (${location.href})`);
            }
        });
    }

    /**
     * Hook the product of ElementBindings and ElementSelectors to the DOM-tree.
     * @param database   the database that should be used when logging.
     */
    private hookToDOM(database: DatabaseAdaptable) {
        let elementEventBinding: ElementEventBindingCreatable;
        let elementSelectionBinding: ElementSelectionBehaviourCreatable;
        let elementEventBindingHolder: ElementEventBinding;
        let elementSelectionBindingHolder: ElementSelectionBehaviour;

        for (elementSelectionBinding of this.elementSelectionBindingList) {
            elementSelectionBindingHolder = new elementSelectionBinding(database);

            for (elementEventBinding of this.elementEventBindingList) {
                elementEventBindingHolder = new elementEventBinding(elementSelectionBindingHolder);
            }
        }
    }

}