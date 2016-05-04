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

    public getCallback() {
        return (function(eventObject: JQueryEventObject) {
            
        });
    }
}
