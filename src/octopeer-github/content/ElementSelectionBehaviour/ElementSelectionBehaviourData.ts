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
    {elementID: ElementID.ADD_EMOTICON, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CANCEL_EDIT_COMMENT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CANCEL_EDIT_PRNAME, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CANCEL_INLINE_COMMENT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CLOSE_PR, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CREATE_PR_COMMENT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CONFIRM_EDIT_COMMENT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CONFIRM_INLINE_COMMENT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CREATE_INLINE_COMMENT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.EDIT_COMMENT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.EDIT_PR_NAME, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.MERGE_PR, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.SAVE_PR_NAME, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.SHOW_CI_CHECKS_TOGGLE, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.SHOW_CI_DETAILS, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    /** Category: Miscellaneous */
    {elementID: ElementID.DATE, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    /** Category: Name */
    {elementID: ElementID.COMMIT_HASHCODE, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.COMMIT_NAME, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.OTHER_CONTRIBUTOR, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.PR_CREATOR, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.PR_PARTICIPANT, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    /** Category: Setting */
    {elementID: ElementID.ASSIGNEE, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.LABELS, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.LOCK_CONVERSATION, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.MILESTONE, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.UNSUBSCRIBE, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    /** Category: Tab header */
    {elementID: ElementID.COMMITS_TAB, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.CONVERSATION_TAB, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.FILES_CHANGED_TAB, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    /** Category: Textfield */
    {elementID: ElementID.COMMENT_TEXTFIELD, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
    {elementID: ElementID.INLINE_COMMENT_TEXTFIELD, foundOnPages: null, name: "Merge PR", selector: ".js-merge-branch-action"},
];
