/**
 * Created by Youri on 03/05/2016.
 */

type EventID = number;

/**
 * ElementEventBinding dictates on what events the callback should be called.
 */
interface ElementEventBinding {

    /**
     * Creates a ElementEventBinding object.
     * @param elementSelectionBehaviour the ELement selection behaviour to use.
     */
    new (elementSelectionBehaviour: ElementSelectionBehaviour): ElementEventBinding;
}
