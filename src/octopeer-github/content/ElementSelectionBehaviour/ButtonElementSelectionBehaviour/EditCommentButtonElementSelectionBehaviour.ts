/// <reference path="ButtonElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the EditComment button
 */
class EditCommentButtonElementSelectionBehaviour extends ButtonElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".timeline-comment-actions button:has(svg.octicon-pencil)";
        this.elementID = new ElementID(109);
    }
}