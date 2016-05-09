/**
 * Created by Youri on 08/05/2016.
 */
/**
 * Class to hold eventID's so they can be a semantically different data type.
 */
class EventID {
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
}
