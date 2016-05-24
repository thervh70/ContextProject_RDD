/**
 * Created by Youri on 08/05/2016.
 * Class to hold elementID's so they can be a semantically different data type.
 */
class ElementID {

    /** Instantiated ElementID for the MergePullRequestButton. */
    public static get MERGEPRREQUEST() { return new ElementID(101); }
    /** Instantiated ElementID for the ClosePullRequestButton. */
    public static get CLOSEPRREQUEST() { return new ElementID(102); }
    /** Instantiated ElementID for the CancelInlineCommentButton. */
    public static get CANCELINLINECOMMENT() { return new ElementID(103); }
    /** Instantiated ElementID for the ConfirmInlineCommentButton. */
    public static get CONFIRMINLINECOMMENT() { return new ElementID(104); }
    /** Instantiated ElementID for the CreateInlineCommentButton. */
    public static get CREATEINLINECOMMENT() { return new ElementID(105); }
    /** Instantiated ElementID for the EditPullRequestNameButton. */
    public static get EDITPRNAME() { return new ElementID(106); }
    /** Instantiated ElementID for the SavePullRequestNameButton. */
    public static get SAVEPRNAME() { return new ElementID(107); }
    /** Instantiated ElementID for the CancelEditPullRequestNameButton. */
    public static get CANCELEDITPRNAME() { return new ElementID(108); }
    /** Instantiated ElementID for the EditCommentButton. */
    public static get EDITCOMMENT() { return new ElementID(109); }
    /** Instantiated ElementID for the AddEmoticonButton. */
    public static get ADDEMOTICON() { return new ElementID(110); }
    /** Instantiated ElementID for the ShowCIChecksToggleButton. */
    public static get SHOWCICHECKSTOGGLE() { return new ElementID(111); }
    /** Instantiated ElementID for the ShowCIDetailsButton. */
    public static get SHOWCIDETAILS() { return new ElementID(112); }
    /** Instantiated ElementID for the CommentPullRequestButton. */
    public static get COMMENTPR() { return new ElementID(113); }
    /** Instantiated ElementID for the ConversationTab. */
    public static get CONVERSATIONTAB() { return new ElementID(201); }
    /** Instantiated ElementID for the CommitsTab. */
    public static get COMMITSTAB() { return new ElementID(202); }
    /** Instantiated ElementID for the FilesChangedTab. */
    public static get FILESCHANGEDTAB() { return new ElementID(203); }
    /** Instantiated ElementID for the CommitHashCode. */
    public static get COMMITHASHCODE() { return new ElementID(301); }
    /** Instantiated ElementID for the CommitName. */
    public static get COMMITNAME() { return new ElementID(302); }
    /** Instantiated ElementID for the PullRequestCreator. */
    public static get PRCREATOR() { return new ElementID(303); }
    /** Instantiated ElementID for the PullRequestParticipant. */
    public static get PRPARTICIPANT() { return new ElementID(304); }
    /** Instantiated ElementID for the OtherContributer. */
    public static get OTHERCONTRIBUTER() { return new ElementID(305); }
    /** Instantiated ElementID for the LabelsSetting. */
    public static get LABELS() { return new ElementID(401); }
    /** Instantiated ElementID for the MilestoneSetting. */
    public static get MILESTONE() { return new ElementID(402); }
    /** Instantiated ElementID for the AssigneeSetting. */
    public static get ASSIGNEE() { return new ElementID(403); }
    /** Instantiated ElementID for the UnsubscribeSetting. */
    public static get UNSUBSCRIBE() { return new ElementID(404); }
    /** Instantiated ElementID for the LockConversationSetting. */
    public static get LOCKCONVERSATION() { return new ElementID(405); }
    /** Instantiated ElementID for the CommentTextField. */
    public static get COMMENTTEXTFIELD() { return new ElementID(501); }
    /** Instantiated ElementID for the InlineCommentTextField. */
    public static get INLINECOMMENTTEXTFIELD() { return new ElementID(502); }
    /** Instantiated ElementID for the Date. */
    public static get DATE() { return new ElementID(901); }

    /**
     * Create a new ElementID object.
     * @param elementID the element id to hold.
     */
    constructor(private elementID: number) {}

    /**
     * Get the value of the element ID.
     * @returns {number}
     */
    public getElementID(): number {
        return this.elementID;
    }

    /**
     * @returns {string} A string containing only the elementID.
     */
    public toString(): string {
        return `${this.elementID}`;
    }
}
