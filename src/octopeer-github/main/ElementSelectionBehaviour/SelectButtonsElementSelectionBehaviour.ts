/**
 * Created by Youri on 03/05/2016.
 */

/**
 * Class for selecting buttons.
 */
class SelectButtonsElementSelectionBehaviour implements ElementSelectionBehaviour {
    private elementDsc: string = ".btn";
    private elementID: ElementID  = 1;

    /**
     * Creates a SelectButtonsElementSelectionBehaviour object.
     * @param database the database to push to.
     */
    public constructor(private database: DatabaseAdapterInterface) {}

    /**
     * Get the elementID for buttons
     * @returns {ElementID} ElementID for buttons
     */
    public getElementId() {
        return this.elementID;
    };

    /**
     * Get the buttons.
     * @returns {JQuery} button elements.
     */
    public getElements() {
        return $(this.elementDsc);
    };

    /**
     * Get a callback to bind to the event.
     * @param eventID the id of the event.
     * @returns {function(JQueryEventObject)} an EventHandler to handle the event on the selected objects.
     */
    public getCallback(eventID: EventID) {
        return (function(eventObject: JQueryEventObject) {
            // TODO: check when the new Date is triggerd.
            this.database.log(this.getElementId(), eventID, new Date(), 0);
        });
    }
}
