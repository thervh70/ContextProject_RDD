/// <reference path="ElementSelectionBehaviour.ts"/>
/// <reference path="../ElementEventBinding/ElementEventBinding.ts"/>
/**
 * Created by Maarten on 2016-05-31.
 * The GenericElementSelectionBehaviour should be instantiated with an ESBData object.
 * This object defines the properties of the GenericESB.
 */
class GenericElementSelectionBehaviour implements ElementSelectionBehaviour {

    /**
     * Creates a GenericElementSelectionBehaviour object.
     * @param database the database to push to.
     * @param data The data of the ElementSelectionBehaviour
     */
    public constructor(private database: DatabaseAdaptable, protected data: ElementSelectionBehaviourData) { }

    /**
     * Get the elementID for buttons
     * @returns {ElementID} ElementID for buttons
     */
    public getElementID() {
        return this.data.elementID;
    }

    /**
     * Get the elements that are selected by a jQuery selector.
     * @returns {JQuery} elements
     */
    public getElements() {
        if (this.data.composedSelector === undefined) {
            return $(this.data.selector);
        } else {
            return this.data.composedSelector();
        }
    }

    /**
     * Get the Data object.
     * @returns {ElementSelectionBehaviourData} the Data object.
     */
    public getData() {
        return this.data;
    }

    /**
     * Get a callback to bind to the event.
     * @param eventID the id of the event.
     * @returns {function(JQueryEventObject)} an EventHandler to handle the event on the selected objects.
     */
    public getCallback(eventID: EventID) {
        return (jQueryEventObject: JQueryEventObject) => {
            let eventObject: EventObject;
            if (this.data.processEvent === undefined) {
                eventObject = EventFactory.semantic(this.getElementID(), eventID);
            } else {
                eventObject = this.data.processEvent(jQueryEventObject, eventID);
            }
            this.database.post(eventObject, EMPTY_CALLBACK, EMPTY_CALLBACK);
        };
    }
}
