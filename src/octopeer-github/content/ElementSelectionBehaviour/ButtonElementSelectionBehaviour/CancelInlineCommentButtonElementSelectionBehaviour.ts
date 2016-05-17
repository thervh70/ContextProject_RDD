/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Cancel button
 */
class CancelInlineCommentButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".js-hide-inline-comment-form";
        this.elementID = new ElementID(103);
    }
}
