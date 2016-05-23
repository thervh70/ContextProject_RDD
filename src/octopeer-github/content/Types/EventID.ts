/**
 * Created by Youri on 08/05/2016.
 * Class to hold eventID's so they can be a semantically different data type.
 */
class EventID {

    
    public static get KEYSTROKE() { return new EventID(101); }
    public static get CLICK() { return new EventID(201); }
    public static get MOUSEENTER() { return new EventID(202); }
    public static get MOUSELEAVE() { return new EventID(203); }
    public static get SCROLLINTOVIEW() { return new EventID(301); }
    public static get SCROLLOUTOFVIEW() { return new EventID(302); }
    public static get STARTWATCHINGPR() { return new EventID(401); }
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
