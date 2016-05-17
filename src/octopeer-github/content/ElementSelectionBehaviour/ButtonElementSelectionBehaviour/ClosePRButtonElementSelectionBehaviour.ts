/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the ClosePR button
 */
class ClosePRButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".js-comment-and-button";
        this.elementID = new ElementID(102);
    }
}
