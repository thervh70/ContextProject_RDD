/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-13.
 * Class for selecting the ClosePR button
 */
class CreatePRCommentButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database, ElementID.CREATE_PR_COMMENT, ".timeline-comment button.btn-primary[data-disable-invalid]");
    }
}
