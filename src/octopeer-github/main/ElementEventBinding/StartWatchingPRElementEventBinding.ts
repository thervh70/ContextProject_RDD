/**
 * Created by Mathias on 2016-05-11.
 */
class StartWatchingPRElementEventBinding implements ElementEventBinding {
    public eventType: string = "startwatchingPR";
    public eventID: EventID  = new EventID(7);

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
