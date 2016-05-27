/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-13.
 * Class for selecting the Comment textfield
 */
class CommentTextFieldElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database, ElementID.COMMENT_TEXTFIELD, ".timeline-comment #new_comment_field");
    }
}
