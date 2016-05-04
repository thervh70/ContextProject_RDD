/**
 * Created by Youri on 03/05/2016.
 */

/**
 * Class for selecting buttons.
 */
class SelectButtonsElementSelectionBehaviour implements ElementSelectionBehaviour {
    private elementDsc: string = ".button";
    private elementID: ElementID  = 1;

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
     * Binds the event handler into the context of the selected element.
     * @param eventHandler the event handler to context-binding.
     * @param context the context in which the function needs to be evaluated.
     * @returns {EventHandler} The event handler in the given context.
     */
    public putIntoContext(eventHandler: EventHandler, context: JQuery) {
        return eventHandler;
    }
}
