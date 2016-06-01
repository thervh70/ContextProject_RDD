/* tslint:disable:max-line-length */
/// <reference path="../main/Options/DoNotWatchOptions.ts"/>
/// <reference path="../main/Database/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/KeystrokeElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/MouseEnterElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/MouseLeaveElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ScrollIntoViewElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ScrollOutOfViewElementEventBinding.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/AbstractElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/AddEmoticonButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelEditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ShowCIDetailsButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ClosePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ConfirmInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CommentPRButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CreateInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/SavePRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ShowChecksToggleButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/MiscellaneousElementSelectionBehaviour/DateMiscellaneousElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/CommitHashcodeNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/CommitMessageNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/OtherContributerNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/PRCreatorNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/NameElementSelectionBehaviour/PRParticipantNameElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/AssigneeSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/LabelSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/LockConversationSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/MilestoneSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SettingElementSelectionBehaviour/UnsubscribeSettingElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/CommitsTabHeaderElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/ConversationTabHeaderElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/TabHeaderElementSelectionBehaviour/FilesChangedTabHeaderElementSelectionBehaviour.ts"/>
/* tslint:enable:max-line-length */

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
     * A private DatabaseAdaptable that sends messages to the background page.
     * @type {MessageSendDatabaseAdapter}
     */
    private messageSendDatabaseAdapter = new MessageSendDatabaseAdapter();

    /**
     * Starts the ContentController. After calling this, all event handlers are hooked to the DOM-tree.
     * @return this
     */
    public start() {
        Options.init();
        Options.update();
        if (!chrome.runtime.onMessage.hasListeners()) {
            chrome.runtime.onMessage.addListener(this.processMessageFromBackgroundPage());
        }
        return this;
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private processMessageFromBackgroundPage() {
        const self = this;
        return function (request: any, sender: any, sendResponse: Function) {
            if (!request.hookToDom) {
                sendResponse(`did nothing (${location.href})`);
                return;
            }
            try {
                self.hookToDOM(self.messageSendDatabaseAdapter);
                $("body").click(function () {
                    self.hookToDOM(self.messageSendDatabaseAdapter);
                });
            } catch (e) {
                sendResponse(`has errored (${location.href})\n[ERR] ${e}`);
                console.error(e);
                return;
            }
            sendResponse(`hooked to DOM (${location.href})`);
        };
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
        let windowResolutionTracker: WindowResolutionTracker;
        let keystrokeTracker: KeystrokeTracker;
        let mouseClickTracker: MouseClickTracker;
        let mouseScrollTracker: MouseScrollTracker;
        let mousePositionTracker: MousePositionTracker;

        for (elementSelectionBinding of this.elementSelectionBindingList) {
            if (!DoNotWatchOptions.shouldElementBeLogged(elementSelectionBinding)) {
                continue;
            }

            elementSelectionBindingHolder = new elementSelectionBinding(database);

            for (elementEventBinding of this.elementEventBindingList) {
                if (DoNotWatchOptions.shouldEventBeLogged(elementEventBinding) &&
                    DoNotWatchOptions.shouldCombinationBeLogged({
                        element: elementSelectionBinding,
                        event: elementEventBinding,
                    })
                ) {
                    elementEventBindingHolder = new elementEventBinding(elementSelectionBindingHolder);
                }
            }
        }
        windowResolutionTracker = new WindowResolutionTracker(database);
        keystrokeTracker = new KeystrokeTracker(database);
        mouseClickTracker = new MouseClickTracker(database);
        mouseScrollTracker = new MouseScrollTracker(database);
        mousePositionTracker = new MousePositionTracker(database);
    }

}
