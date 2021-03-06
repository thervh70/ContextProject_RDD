/**
 * Created by Youri on 08/05/2016.
 * Class to hold eventID's so they can be a semantically different data type.
 */
class EventID {

    /**
     * The 'Getters' in this list are not really getters,
     * they are the closest thing TypeScript has to offer as
     * public static final fields.
     */
    /** Instantiated EventID for a Keystroke event. */
    public static get KEYSTROKE() { return new EventID(101); }
    /** Instantiated EventID for a Click event. */
    public static get CLICK() { return new EventID(201); }
    /** Instantiated EventID for a MouseEnter event. */
    public static get MOUSE_ENTER() { return new EventID(202); }
    /** Instantiated EventID for a MouseLeave event. */
    public static get MOUSE_LEAVE() { return new EventID(203); }
    /** Instantiated EventID for the default Scroll event. */
    public static get SCROLL() { return new EventID(300); }
    /** Instantiated EventID for a ScrollIntoView event. */
    public static get SCROLL_INTO_VIEW() { return new EventID(301); }
    /** Instantiated EventID for a ScrollOutOfView event. */
    public static get SCROLL_OUT_OF_VIEW() { return new EventID(302); }
    /** Instantiated EventID for a StartWatchingPullRequest event. */
    public static get START_WATCHING_PR() { return new EventID(401); }
    /** Instantiated EventID for a StopWatchingPullRequest event. */
    public static get STOP_WATCHING_PR() { return new EventID(402); }

    /**
     * Create a new EventID object.
     * @param eventID the event id to hold.
     */
    constructor(private eventID: number) {}

    /**
     * get the value of the event ID.
     * @returns {number}
     */
    public getEventID(): number {
        return this.eventID;
    }

    /**
     * Checks whether two EventIDs are equal.
     * @param that EventID to compare with.
     * @returns {boolean} true if the EventIDs are equal, false otherwise.
     */
    public equals(that: EventID) {
        return this.eventID === that.eventID;
    }

    /**
     * @returns {string} A string containing only the eventID.
     */
    public toString(): string {
        return `${this.eventID}`;
    }
}
