/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Comment button
 */
class CommentInlineCommentButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database, ElementID.CONFIRM_INLINE_COMMENT, ".js-inline-comment-form button[type=submit]:not([disabled])");
    }
}
