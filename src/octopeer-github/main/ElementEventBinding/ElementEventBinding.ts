/**
 * Created by Youri on 03/05/2016.
 */

type EventID = number;

/**
 * ElementEventBinding dictates on what events the callback should be called.
 */
interface ElementEventBinding {}

/**
 * Makes it so we can instatiate by classname, for reference see:
 * http://stackoverflow.com/questions/13407036/how-does-typescript-interfaces-with-construct-signatures-work
 */
interface ElementEventBindingCreatable {
    /**
     * Creates a ElementEventBinding object.
     * @param elementSelectionBehaviour the ELement selection behaviour to use.
     */
    new (elementSelectionBehaviour: ElementSelectionBehaviour): ElementEventBinding;
}
