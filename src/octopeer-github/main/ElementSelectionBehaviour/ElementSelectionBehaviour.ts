/**
 * Created by Youri on 03/05/2016.
 */
type ElementID = number;

/**
 * The element selection behaviour.
 * this is used by the tracker and ElementEventBindingBehaviour
 */
interface ElementSelectionBehaviour {
    /**
     * Get the elementID corresponding with the database elementID.
     */
    getElementId(): ElementID;

    /**
     * Retieve the elements this behaviour selects from the dom tree.
     */
    getElements(): JQuery;

    /**
     * Binds the event handler into the context of the selected element.
     * @param eventHandler the event handler to context-binding.
     * @param context the context in which the function needs to be evaluated.
     * @returns {EventHandler} The event handler in the given context.
     */
    putIntoContext(eventHandler: EventHandler, context: JQuery): EventHandler;
}
