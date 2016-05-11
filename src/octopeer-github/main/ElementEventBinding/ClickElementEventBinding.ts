/// <reference path="../ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/**
 * Created by Youri on 04/05/2016.
 */

/**
 * Class for adding click events.
 */
class ClickElementEventBinding implements ElementEventBinding {
    public eventType: string = "click";
    public eventID: EventID  = new EventID(101);

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
