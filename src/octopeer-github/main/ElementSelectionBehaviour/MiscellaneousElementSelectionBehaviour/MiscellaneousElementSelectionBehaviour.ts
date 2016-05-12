/// <reference path="../ElementSelectionBehaviour.ts"/>
/// <reference path="../../DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="../../ElementEventBinding/ElementEventBinding.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 */
abstract class MiscellaneousElementSelectionBehaviour implements ElementSelectionBehaviour {

    /**
     * The description of the Element
     */
    protected elementDsc: string;
    /**
     * The ID of the Element
     */
    protected elementID: ElementID;

    /**
     * Creates a ButtonsElementSelectionBehaviour object.
     * @param database the database to push to.
     */
    public constructor(private database: DatabaseAdaptable) {}

    /**
     * Get the elementID for buttons
     * @returns {ElementID} ElementID for buttons
     */
    public getElementID() {
        return this.elementID;
    }

    /**
     * Get the buttons.
     * @returns {JQuery} button elements.
     */
    public getElements() {
        return $(this.elementDsc);
    }

    /**
     * Get a callback to bind to the event.
     * @param eventID the id of the event.
     * @returns {function(JQueryEventObject)} an EventHandler to handle the event on the selected objects.
     */
    public getCallback(eventID: EventID) {
        const self = this;
        return (function(eventObject: JQueryEventObject) {
            // TODO: check when the new Date is triggered.
            self.database.log(self.getElementID(), eventID, new Date(), 0,
                EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }
}
