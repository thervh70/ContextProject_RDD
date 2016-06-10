/// <reference path="../Types/ElementID.ts"/>
/// <reference path="../Types/PageMask.ts"/>
/**
 * Created by Mathias on 30-05-2016.
 * This interface enforces the Data elements of the ElementSelectionBehaviours.
 * elementID is the corresponding ID given in ElementID.
 * name is the Name of the type of ESB
 * selector is the JQuery selector used to get this element from the webpage
 * foundOnPage indicates on which html pages this element can be found. (further explanation: see PageMask)
 * composedSelector is an optional function to select the element that can't be selected by the JQuery selectors
 * callback is an optional function that overrides the default callback when necessary.
 */
interface ElementSelectionBehaviourData {
    callback?: (event: JQueryEventObject) => void;
    composedSelector?: () => JQuery;
    elementID: ElementID;
    foundOnPages: PageMask;
    name: string;
    selector: string;
}

/**
 * unsortedESBData contains all data about the diferent ESB's. It is a list of
 * ESBData objects, which are still unsorted. In the ESBFactory, the list will be
 * automatically sorted before it is used. This to prevent the need of manual sorting.
 * @type {ElementSelectionBehaviourData[]}
 */
// tslint:disable-next-line:no-unused-variable
const elementSelectionBehaviourDataList: ElementSelectionBehaviourData[] = [
    /** Category: Button */
    {
        elementID: ElementID.ADD_EMOTICON,
        foundOnPages: PageMask.combine(PageMask.CONVERSATION, PageMask.FILES_CHANGED),
        name: "Add emoticon",
        selector: ".timeline-comment-actions button:has(svg.octicon-smiley)",
    },
    {
        elementID: ElementID.CANCEL_EDIT_COMMENT,
        foundOnPages: PageMask.combine(), // TODO fix!
        name: "Cancel Edit Comment",
        selector: ".is-comment-editing button.js-comment-cancel-button",
    },
    {
        elementID: ElementID.CANCEL_EDIT_PRNAME,
        foundOnPages: PageMask.ALL,
        name: "Cancel edit PR name",
        selector: "#partial-discussion-header.open .gh-header-edit button.js-details-target",
    },
    {
        elementID: ElementID.CANCEL_INLINE_COMMENT,
        foundOnPages: PageMask.FILES_CHANGED,
        name: "Cancel inline comment",
        selector: "div#files tr.inline-comments .js-hide-inline-comment-form",
    },
    {
        elementID: ElementID.CLOSE_PR,
        foundOnPages: PageMask.CONVERSATION,
        name: "Close PR",
        selector: ".js-comment-and-button",
    },
    {
        elementID: ElementID.CREATE_PR_COMMENT,
        foundOnPages: PageMask.CONVERSATION,
        name: "Comment on PR",
        selector: ".timeline-comment button.btn-primary[data-disable-invalid]",
    },
    {
        elementID: ElementID.CONFIRM_EDIT_COMMENT,
        foundOnPages: PageMask.combine(), // TODO fix!
        name: "Confirm Edit Comment",
        selector: ".is-comment-editing button.btn-primary",
    },
    {
        elementID: ElementID.CONFIRM_INLINE_COMMENT,
        foundOnPages: PageMask.FILES_CHANGED,
        name: "Comment inline comment",
        selector: ".js-inline-comment-form button[type=submit]:not([disabled])",
    },
    {
        elementID: ElementID.CREATE_INLINE_COMMENT,
        foundOnPages: PageMask.FILES_CHANGED,
        name: "Create Inline Comment",
        selector: ".add-line-comment",
    },
    {
        elementID: ElementID.EDIT_COMMENT,
        foundOnPages: PageMask.combine(PageMask.CONVERSATION, PageMask.FILES_CHANGED),
        name: "Edit comment",
        selector: ".timeline-comment-actions button:has(svg.octicon-pencil)",
    },
    {
        elementID: ElementID.EDIT_PR_NAME,
        foundOnPages: PageMask.ALL,
        name: "Edit PR name",
        selector: ".gh-header-actions button",
    },
    {
        elementID: ElementID.MERGE_PR,
        foundOnPages: PageMask.CONVERSATION,
        name: "Merge PR",
        selector: ".js-merge-branch-action",
    },
    {
        elementID: ElementID.SAVE_PR_NAME,
        foundOnPages: PageMask.ALL,
        name: "Save PR name",
        selector: "#partial-discussion-header.open .gh-header-edit button[type=submit]",
    },
    {
        elementID: ElementID.SHOW_CI_CHECKS_TOGGLE,
        foundOnPages: PageMask.CONVERSATION,
        name: "Show CI checks",
        selector: ".merge-pr button.js-details-target:has(span)",
    },
    {
        elementID: ElementID.SHOW_CI_DETAILS,
        foundOnPages: PageMask.combine(), // TODO fix!
        name: "Show CI details",
        selector: ".merge-pr .build-status-details",
    },
    /** Category: Miscellaneous */
    {
        elementID: ElementID.DATE,
        foundOnPages: PageMask.ALL,
        name: "Date",
        selector: "relative-time",
    },
    /** Category: Name */
    {
        elementID: ElementID.COMMIT_HASHCODE,
        foundOnPages: PageMask.combine(PageMask.CONVERSATION, PageMask.COMMITS),
        name: "Commit hashcode",
        selector: ".commit-id,.commit-links-cell a.sha",
    },
    {
        elementID: ElementID.COMMIT_NAME,
        foundOnPages: PageMask.combine(PageMask.CONVERSATION, PageMask.COMMITS),
        name: "Commit message name",
        selector: "a.message",
    },
    {
        composedSelector: () => {
            let prContributers: string[] = [];
            $(".participation-avatars a").each(function() { prContributers.push($(this).attr("aria-label")); });
            // Substring(1) is used because of the @ prefix
            return $(".user-mention:not([rel])").filter(function() { return !prContributers.contains($(this).html().substring(1)); });
        },
        elementID: ElementID.OTHER_CONTRIBUTOR,
        foundOnPages: PageMask.combine(PageMask.CONVERSATION, PageMask.FILES_CHANGED),
        name: "Contributor name: Other contributor",
        selector: "",
    },
    {
        composedSelector: () => {
            let prCreator = $.trim($(".pull-header-username").html());
            return $("a.author, .user-mention").filter(function () { return $.trim($(this).html()) === prCreator; });
        },
        elementID: ElementID.PR_CREATOR,
        foundOnPages: PageMask.ALL,
        name: "Contributor name: PR creator",
        selector: "",
    },
    {
        composedSelector: () => {
            let prCreator = $.trim($(".pull-header-username").html());
            return $("a.author").filter(function () { return $.trim($(this).html()) !== prCreator; });
        },
        elementID: ElementID.PR_PARTICIPANT,
        foundOnPages: PageMask.ALL,
        name: "Contributor name: PR participant",
        selector: "",
    },
    /** Category: Setting */
    {
        elementID: ElementID.ASSIGNEE,
        foundOnPages: PageMask.CONVERSATION,
        name: "Assignee",
        selector: "#partial-discussion-sidebar button[data-hotkey=a]",
    },
    {
        elementID: ElementID.LABELS,
        foundOnPages: PageMask.CONVERSATION,
        name: "Labels",
        selector: "#partial-discussion-sidebar button[data-hotkey=l]",
    },
    {
        elementID: ElementID.LOCK_CONVERSATION,
        foundOnPages: PageMask.CONVERSATION,
        name: "Lock conversation",
        selector: "#partial-discussion-sidebar a:has(svg.octicon-lock)",
    },
    {
        elementID: ElementID.MILESTONE,
        foundOnPages: PageMask.CONVERSATION,
        name: "Milestones",
        selector: "#partial-discussion-sidebar button[data-hotkey=m]",
    },
    {
        elementID: ElementID.UNSUBSCRIBE,
        foundOnPages: PageMask.CONVERSATION,
        name: "Unsubscribe from notifications",
        selector: "#partial-discussion-sidebar button:has(svg.octicon-mute)",
    },
    /** Category: Tab header */
    {
        elementID: ElementID.COMMITS_TAB,
        foundOnPages: PageMask.ALL,
        name: "Commits tab",
        selector: ".tabnav-tabs a:has(> svg.octicon-git-commit)",
    },
    {
        elementID: ElementID.CONVERSATION_TAB,
        foundOnPages: PageMask.ALL,
        name: "Conversation tab",
        selector: ".tabnav-tabs a:has(> svg.octicon-comment-discussion)",
    },
    {
        elementID: ElementID.FILES_CHANGED_TAB,
        foundOnPages: PageMask.ALL,
        name: "Files changed tab",
        selector: ".tabnav-tabs a:has(> svg.octicon-diff)",
    },
    /** Category: Textfield */
    {
        elementID: ElementID.COMMENT_TEXTFIELD,
        foundOnPages: PageMask.combine(), // TODO fix!
        name: "Comment textfield",
        selector: ".timeline-comment #new_comment_field",
    },
    {
        elementID: ElementID.INLINE_COMMENT_TEXTFIELD,
        foundOnPages: PageMask.combine(), // TODO fix!
        name: "Inline comment textfield",
        selector: ".js-inline-comment-form textarea[id^=new]",
    },
];
