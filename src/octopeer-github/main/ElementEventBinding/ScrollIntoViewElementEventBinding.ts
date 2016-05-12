// TODO Should this be monitored? How should this be monitored? Not part of js events.
/**
 * Created by Mathias on 2016-05-11.
 * Class to create ScrollIntoView events
 */
class ScrollIntoViewElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    public eventType: string = "scrollintoview";
    /**
     * The ID of the Event
     */
    public eventID: EventID  = new EventID(105);

    /**
     * Constructor, creates the object and adds the event handler to the elements selected by the elementSelectionBehaviour.
     * @param elementSelectionBehaviour dictates what elements are selected.
     */
    constructor(private elementSelectionBehaviour: ElementSelectionBehaviour) {
        elementSelectionBehaviour.getElements().on(
            this.eventType,
            this.elementSelectionBehaviour.getCallback(this.eventID)
        );
    }
}
