/// <reference path="TextFieldElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-13.
 * Class for selecting the Comment textfield
 */
class CommentTextFieldElementSelectionBehaviour extends TextFieldElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".timeline-comment #new_comment_field";
        this.elementID = new ElementID(501);
    }
}
