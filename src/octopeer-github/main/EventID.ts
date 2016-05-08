/**
 * Created by Youri on 08/05/2016.
 */
/**
 * Class to hold elementID's so they can be a semanticaly different datatype.
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
