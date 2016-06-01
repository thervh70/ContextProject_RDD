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
const unsortedElementSelectionBehaviourData: ElementSelectionBehaviourData[] = [
    /** Category: Button */
    {
        elementID: ElementID.ADD_EMOTICON,
        foundOnPages: null,
        name: "Add emoticon",
        selector: ".timeline-comment-actions button:has(svg.octicon-smiley)",
    },
    {
        elementID: ElementID.CANCEL_EDIT_COMMENT,
        foundOnPages: null,
        name: "Cancel Edit Comment",
        selector: ".is-comment-editing button.js-comment-cancel-button",
    },
    {
        elementID: ElementID.CANCEL_EDIT_PRNAME,
        foundOnPages: null,
        name: "Cancel edit PR name",
        selector: "#partial-discussion-header.open .gh-header-edit button.js-details-target",
    },
    {
        elementID: ElementID.CANCEL_INLINE_COMMENT,
        foundOnPages: null,
        name: "Cancel inline comment",
        selector: "div#files tr.inline-comments .js-hide-inline-comment-form",
    },
    {
        elementID: ElementID.CLOSE_PR,
        foundOnPages: null,
        name: "Close PR",
        selector: ".js-comment-and-button",
    },
    {
        elementID: ElementID.CREATE_PR_COMMENT,
        foundOnPages: null,
        name: "Comment on PR",
        selector: ".timeline-comment button.btn-primary[data-disable-invalid]",
    },
    {
        elementID: ElementID.CONFIRM_EDIT_COMMENT,
        foundOnPages: null,
        name: "Confirm Edit Comment",
        selector: ".is-comment-editing button.btn-primary",
    },
    {
        elementID: ElementID.CONFIRM_INLINE_COMMENT,
        foundOnPages: null,
        name: "Comment inline comment",
        selector: ".js-inline-comment-form button[type=submit]:not([disabled])",
    },
    {
        elementID: ElementID.CREATE_INLINE_COMMENT,
        foundOnPages: null,
        name: "Create Inline Comment",
        selector: ".add-line-comment",
    },
    {
        elementID: ElementID.EDIT_COMMENT,
        foundOnPages: null,
        name: "Edit comment",
        selector: ".timeline-comment-actions button:has(svg.octicon-pencil)",
    },
    {
        elementID: ElementID.EDIT_PR_NAME,
        foundOnPages: null,
        name: "Edit PR name",
        selector: ".gh-header-actions button",
    },
    {elementID: ElementID.MERGE_PR, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {
        elementID: ElementID.SAVE_PR_NAME,
        foundOnPages: null,
        name: "Save PR name",
        selector: "#partial-discussion-header.open .gh-header-edit button[type=submit]",
    },
    {
        elementID: ElementID.SHOW_CI_CHECKS_TOGGLE,
        foundOnPages: null,
        name: "Show CI checks",
        selector: ".merge-pr button.js-details-target:has(span)",
    },
    {
        elementID: ElementID.SHOW_CI_DETAILS,
        foundOnPages: null,
        name: "Show CI details",
        selector: ".merge-pr .build-status-details",
    },
    /** Category: Miscellaneous */
    {
        elementID: ElementID.DATE,
        foundOnPages: null,
        name: "Date",
        selector: "relative-time",
    },
    /** Category: Name */
    {
        elementID: ElementID.COMMIT_HASHCODE,
        foundOnPages: null,
        name: "Commit hashcode",
        selector: ".commit-id,.commit-links-cell a.sha",
    },
    {
        elementID: ElementID.COMMIT_NAME,
        foundOnPages: null,
        name: "Commit message name",
        selector: ".js-merge-branch-action",
    },
    {
        elementID: ElementID.OTHER_CONTRIBUTOR,
        foundOnPages: null,
        name: "Contributor name: Other contributor",
        selector: "teststss",
    },
    {
        elementID: ElementID.PR_CREATOR,
        foundOnPages: null,
        name: "Contributor name: PR creator",
        selector: "testtttt",
    },
    {
        elementID: ElementID.PR_PARTICIPANT,
        foundOnPages: null,
        name: "Contributor name: PR participant",
        selector: "testtttt",
    },
    /** Category: Setting */
    {
        elementID: ElementID.ASSIGNEE,
        foundOnPages: null,
        name: "Assignee",
        selector: "#partial-discussion-sidebar button[data-hotkey=a]",
    },
    {
        elementID: ElementID.LABELS,
        foundOnPages: null,
        name: "Labels",
        selector: "#partial-discussion-sidebar button[data-hotkey=l]",
    },
    {
        elementID: ElementID.LOCK_CONVERSATION,
        foundOnPages: null,
        name: "Lock conversation",
        selector: "#partial-discussion-sidebar a:has(svg.octicon-lock)",
    },
    {
        elementID: ElementID.MILESTONE,
        foundOnPages: null,
        name: "Milestones",
        selector: "#partial-discussion-sidebar button[data-hotkey=m]",
    },
    {
        elementID: ElementID.UNSUBSCRIBE,
        foundOnPages: null,
        name: "Unsubscribe from notifications",
        selector: "#partial-discussion-sidebar button:has(svg.octicon-mute)",
    },
    /** Category: Tab header */
    {
        elementID: ElementID.COMMITS_TAB,
        foundOnPages: null,
        name: "Commits tab",
        selector: ".tabnav-tabs a:has(> svg.octicon-git-commit)",
    },
    {
        elementID: ElementID.CONVERSATION_TAB,
        foundOnPages: null,
        name: "Conversation tab",
        selector: ".tabnav-tabs a:has(> svg.octicon-comment-discussion)",
    },
    {
        elementID: ElementID.FILES_CHANGED_TAB,
        foundOnPages: null,
        name: "Files changed tab",
        selector: ".tabnav-tabs a:has(> svg.octicon-diff)",
    },
    /** Category: Textfield */
    {
        elementID: ElementID.COMMENT_TEXTFIELD,
        foundOnPages: null,
        name: "Comment textfield",
        selector: ".timeline-comment #new_comment_field",
    },
    {
        elementID: ElementID.INLINE_COMMENT_TEXTFIELD,
        foundOnPages: null,
        name: "Inline comment textfield",
        selector: ".js-inline-comment-form textarea[id^=new]",
    },
];
