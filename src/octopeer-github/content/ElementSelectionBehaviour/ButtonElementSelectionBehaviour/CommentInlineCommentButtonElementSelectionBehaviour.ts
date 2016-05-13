/// <reference path="ButtonElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Comment button
 */
class CommentInlineCommentButtonElementSelectionBehaviour extends ButtonElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".js-inline-comment-form button[type=submit]:not([disabled])";
        this.elementID = new ElementID(104);
    }
}
