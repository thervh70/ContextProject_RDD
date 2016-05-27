/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-25.
 * Class for selecting the ConfirmEditComment button
 */
class CancelEditCommentButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database, ElementID.CANCEL_EDIT_COMMENT, ".is-comment-editing button.js-comment-cancel-button");
    }
}
