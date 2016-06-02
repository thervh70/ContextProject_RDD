/* tslint:disable:max-line-length */
/// <reference path="Options.ts"/>
/// <reference path="../../content/ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ClickElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/KeystrokeElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/MouseEnterElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/MouseLeaveElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ScrollIntoViewElementEventBinding.ts"/>
/// <reference path="../../content/ElementEventBinding/ScrollOutOfViewElementEventBinding.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/AbstractElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/AddEmoticonButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelEditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CancelInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ShowCIDetailsButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ClosePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ConfirmInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CommentPRButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/EditPRNameButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/CreateInlineCommentButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/MergePRButtonElementSelectionBehaviour.ts"/>
/// <reference path="../../content/ElementSelectionBehaviour/ButtonElementSelectionBehaviour/SavePRNameButtonElementSelectionBehaviour.ts"/>
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
 * Created by Youri on 19-5-2016.
 * Additional type for storing tuples of Element and Event Creatables.
 */
import {Opt} from "optimist";
type ElementXEventCreatable = {
    element: ElementSelectionBehaviourCreatable,
    event: ElementEventBindingCreatable
};

/**
 * Class for indicating all internal options of the application.
 */
// tslint:disable-next-line:no-unused-variable
const DoNotWatchOptions = new (class DoNotWatchOptions {
    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getElements() {
        let doNotWatchElements: ElementSelectionBehaviourCreatable[] = [];
        if (Options.get(Options.DNW_COMMENT_ELEMENTS)) {
            doNotWatchElements.push(CommentInlineCommentButtonElementSelectionBehaviour);
            doNotWatchElements.push(CommentPRButtonElementSelectionBehaviour);
            doNotWatchElements.push(EditCommentButtonElementSelectionBehaviour);
        }
        return doNotWatchElements;
    }
    /**
     * Gets Events not to Log, from the chrome storage.
     * @returns {ElementEventBindingCreatable[]}
     */
    public getEvents() {
        let doNotWatchEvents: ElementEventBindingCreatable[] = [];

        if (Options.get(Options.DNW_ON_SCREEN_EVENTS)) {
            doNotWatchEvents.push(ScrollIntoViewElementEventBinding);
            doNotWatchEvents.push(ScrollOutOfViewElementEventBinding);
        }
        if (Options.get(Options.DNW_HOVER_EVENTS)) {
            doNotWatchEvents.push(MouseEnterElementEventBinding);
            doNotWatchEvents.push(MouseLeaveElementEventBinding);
        }
        if (Options.get(Options.DNW_KEYBOARD_EVENTS)) {
            doNotWatchEvents.push(KeystrokeElementEventBinding);
        }
        return doNotWatchEvents;
    }

    /**
     * Gets Combinations not to Log, from the chrome storage.
     * This is currently just a placeholder for the structure to be used.
     * @returns {ElementXEventCreatable[]}
     */
    public getCombinations() {
        let doNotWatchCombination: ElementXEventCreatable[] = [];
        return doNotWatchCombination;
    }
})();
