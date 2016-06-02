/**
 * Created by Mathias on 2016-06-02.
 */
class GenericElementEventBinding implements ElementEventBinding {

    /** The EventID. */
    private eventID: EventID;
    /** The name. */
    private eventName: string;

    /**
     * Get the EventID.
     * @returns {EventID}
     */
    public getEventID() {
        return this.eventID;
    }

    /**
     * Get the eventName.
     * @returns {string}
     */
    public getEventType() {
        return this.eventName;
    }
}
