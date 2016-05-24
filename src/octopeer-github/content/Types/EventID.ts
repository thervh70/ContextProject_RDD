/**
 * Created by Youri on 08/05/2016.
 * Class to hold eventID's so they can be a semantically different data type.
 */
class EventID {

    /** Instantiated EventID for a Keystroke event. */
    public static get KEYSTROKE() { return new EventID(101); }
    /** Instantiated EventID for a Click event. */
    public static get CLICK() { return new EventID(201); }
    /** Instantiated EventID for a MouseEnter event. */
    public static get MOUSEENTER() { return new EventID(202); }
    /** Instantiated EventID for a MouseLeave event. */
    public static get MOUSELEAVE() { return new EventID(203); }
    /** Instantiated EventID for a ScrollIntoView event. */
    public static get SCROLLINTOVIEW() { return new EventID(301); }
    /** Instantiated EventID for a ScrollOutOfView event. */
    public static get SCROLLOUTOFVIEW() { return new EventID(302); }
    /** Instantiated EventID for a StartWatchingPullRequest event. */
    public static get STARTWATCHINGPR() { return new EventID(401); }
    /** Instantiated EventID for a StopWatchingPullRequest event. */
    public static get STOPWATCHINGPR() { return new EventID(402); }

    /**
     * Create a new EventID object.
     * @param eventID the event id to hold.
     */
    constructor(private eventID: number) {}

    /**
     * get the value of the element ID.
     * @returns {number}
     */
    public getEventID(): number {
        return this.eventID;
    }

    /**
     * @returns {string} A string containing only the eventID.
     */
    public toString(): string {
        return `${this.eventID}`;
    }
}
