/**
 * Created by Youri on 08/05/2016.
 */
/**
 * Class to hold elementID's so they can be a semantically different data type.
 */
class ElementID {

    public static get MERGEPRREQUEST() { return new ElementID(101); }
    public static get CLOSEPRREQUEST() { return new ElementID(102); }
    public static get CANCELINLINECOMMENT() { return new ElementID(103); }
    public static get COMMENTINLINECOMMENT() { return new ElementID(104); }
    public static get CREATEINLINECOMMENT() { return new ElementID(105); }
    public static get EDITPRNAME() { return new ElementID(106); }
    public static get SAVEPRNAME() { return new ElementID(107); }
    public static get CANCELEDITPRNAME() { return new ElementID(108); }
    public static get EDITCOMMENT() { return new ElementID(109); }
    public static get ADDEMOTICON() { return new ElementID(110); }
    public static get SHOWCICHECKSTOGGLE() { return new ElementID(111); }
    public static get SHOWCIDETAILS() { return new ElementID(112); }
    public static get COMMENTPR() { return new ElementID(113); }
    public static get CONVERSATIONTAB() { return new ElementID(201); }
    public static get COMMITSTAB() { return new ElementID(202); }
    public static get FILESCHANGEDTAB() { return new ElementID(203); }
    public static get COMMITHASHCODE() { return new ElementID(301); }
    public static get COMMITNAME() { return new ElementID(302); }
    public static get PRCREATOR() { return new ElementID(303); }
    public static get PRPARTICIPANT() { return new ElementID(304); }
    public static get OTHERCONTRIBUTER() { return new ElementID(305); }
    public static get LABELS() { return new ElementID(401); }
    public static get MILESTONE() { return new ElementID(402); }
    public static get ASSIGNEE() { return new ElementID(403); }
    public static get UNSUBSCRIBE() { return new ElementID(404); }
    public static get LOCKCONVERSATION() { return new ElementID(405); }
    public static get COMMENTTEXTFIELD() { return new ElementID(501); }
    public static get INLINECOMMENTTEXTFIELD() { return new ElementID(502); }
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
