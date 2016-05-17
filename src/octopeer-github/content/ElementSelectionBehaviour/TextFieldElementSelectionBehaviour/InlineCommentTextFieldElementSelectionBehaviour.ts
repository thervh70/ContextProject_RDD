/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-13.
 * Class for selecting the InlineComment textfield
 */
class InlineCommentTextFieldElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".js-inline-comment-form textarea[id^=new]";
        this.elementID = new ElementID(502);
    }
}
