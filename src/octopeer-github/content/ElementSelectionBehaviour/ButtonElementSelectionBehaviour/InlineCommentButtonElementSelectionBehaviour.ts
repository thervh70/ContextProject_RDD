/// <reference path="ButtonElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the InlineComment button
 */
class InlineCommentButtonElementSelectionBehaviour extends ButtonElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".add-line-comment";
        this.elementID = new ElementID(105);
    }
}
