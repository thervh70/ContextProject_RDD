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
type ElementXEventCreatable = {
    element: ElementSelectionBehaviourCreatable,
    event: ElementEventBindingCreatable
};

interface ElementThatShouldNotBeWatchedTuple extends Array<string | Array<ElementSelectionBehaviourCreatable>> {
    0: string;
    1: Array<ElementSelectionBehaviourCreatable>;
}

interface EventThatShouldNotBeWatchedTuple extends Array<string | Array<ElementEventBindingCreatable>> {
    0: string;
    1: Array<ElementEventBindingCreatable>;
}

interface CombinationsThatShouldNotBeWatchedTuple extends Array<string | Array<ElementXEventCreatable>> {
    0: string;
    1: Array<ElementXEventCreatable>;
}

/**
 * Class for indicating all internal options of the application.
 */
// tslint:disable-next-line:no-unused-variable
const DoNotWatchOptions = new (class DoNotWatchOptions {

    private elementsThatShouldNotBeWatched: ElementThatShouldNotBeWatchedTuple[] = [
        ["doNotWatchCommentElements", [
            CommentInlineCommentButtonElementSelectionBehaviour,
            CommentPRButtonElementSelectionBehaviour,
            EditCommentButtonElementSelectionBehaviour,
        ]],
    ];

    private eventsThatShouldNotBeWatched: EventThatShouldNotBeWatchedTuple[] = [
        ["doNotWatchOnScreenEvents", [ScrollIntoViewElementEventBinding, ScrollOutOfViewElementEventBinding]],
        ["doNotWatchHoverEvents", [MouseEnterElementEventBinding, MouseLeaveElementEventBinding]],
        ["doNotWatchKeyboardShortcutEvents", [KeystrokeElementEventBinding]],
    ];

    private combinationsThatShouldNotBeWatched: CombinationsThatShouldNotBeWatchedTuple[] = [];

    public shouldElementBeWatched(element: ElementSelectionBehaviourCreatable) {
        return !this.getElements().contains(element);
    }

    public shouldEventBeWatched(event: ElementEventBindingCreatable) {
        return !this.getEvents().contains(event);
    }

    public shouldCombinationBeWatched(combination: ElementXEventCreatable) {
        return !this.getCombinations().contains(combination);
    }

    /**
     * Gets Elements not to Log, from the chrome storage.
     * @returns {ElementSelectionBehaviourCreatable[]}
     */
    public getElements() {
        let doNotWatchElements: ElementSelectionBehaviourCreatable[] = [];
        for (let tuple of this.elementsThatShouldNotBeWatched) {
            if (Options.get(tuple[0])) {
                for (let element of tuple[1]) {
                    doNotWatchElements.push(element);
                }
            }
        }
        return doNotWatchElements;
    }
    /**
     * Gets Events not to Log, from the chrome storage.
     * @returns {ElementEventBindingCreatable[]}
     */
    public getEvents() {
        let doNotWatchEvents: ElementEventBindingCreatable[] = [];
        for (let tuple of this.eventsThatShouldNotBeWatched) {
            if (Options.get(tuple[0])) {
                for (let element of tuple[1]) {
                    doNotWatchEvents.push(element);
                }
            }
        }
        return doNotWatchEvents;
    }

    /**
     * Gets Combinations not to Log, from the chrome storage.
     * This is currently just a placeholder for the structure to be used.
     * @returns {ElementXEventCreatable[]}
     */
    public getCombinations() {
        let doNotWatchCombinations: ElementXEventCreatable[] = [];
        for (let tuple of this.combinationsThatShouldNotBeWatched) {
            if (Options.get(tuple[0])) {
                for (let element of tuple[1]) {
                    doNotWatchCombinations.push(element);
                }
            }
        }
        return doNotWatchCombinations;
    }
})();
