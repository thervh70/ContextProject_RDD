/// <reference path="ElementSelectionBehaviour.ts"/>
/// <reference path="../ElementEventBinding/ElementEventBinding.ts"/>
/**
 * Created by Maarten on 2016-05-31.
 * The GenericElementSelectionBehaviour should be instantiated with an ESBData object.
 * This object defines the properties of the GenericESB.
 */
class GenericElementSelectionBehaviour implements ElementSelectionBehaviour {

    /**
     * Creates a ButtonsElementSelectionBehaviour object.
     * @param database the database to push to.
     * @param data The data of the ElementSelectionBehaviour
     */
    public constructor(private database: SemanticDatabaseAdaptable, protected data: ElementSelectionBehaviourData) { }

    /**
     * Get the elementID for buttons
     * @returns {ElementID} ElementID for buttons
     */
    public getElementID() {
        return this.data.elementID;
    }

    /**
     * Get the buttons.
     * @returns {JQuery} button elements.
     */
    public getElements() {
        if (this.data.composedSelector === undefined) {
            return $(this.data.selector);
        } else {
            return this.data.composedSelector();
        }
    }

    /**
     * Get a callback to bind to the event.
     * @param eventID the id of the event.
     * @returns {function(JQueryEventObject)} an EventHandler to handle the event on the selected objects.
     */
    public getCallback(eventID: EventID) {
        if (this.data.callback === undefined) {
            return (eventObject: JQueryEventObject) => {
                this.database.postSemantic(new SemanticEvent(this.getElementID(), eventID, new Date().getTime(), 0),
                    EMPTY_CALLBACK, EMPTY_CALLBACK);
            };
        } else {
            return this.data.callback;
        }
    }
}
