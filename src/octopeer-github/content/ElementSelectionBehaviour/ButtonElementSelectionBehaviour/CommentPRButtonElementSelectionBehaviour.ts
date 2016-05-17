/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-13.
 * Class for selecting the ClosePR button
 */
class CommentPRButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".timeline-comment button.btn-primary";
        this.elementID = new ElementID(113);
    }
}
