/**
 * Created by Mathias on 2016-05-11.
 * Class to create MouseLeave events
 */
class MouseLeaveElementEventBinding implements ElementEventBinding {

    /**
     * The type of the Event
     */
    public eventType: string = "mouseleave";
    /**
     * The ID of the Event
     */
    public eventID: EventID  = new EventID(104);

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
