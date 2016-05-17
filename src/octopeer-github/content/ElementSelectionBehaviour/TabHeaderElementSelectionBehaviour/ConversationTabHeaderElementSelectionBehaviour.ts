/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Conversation tab header
 */
class ConversationTabHeaderElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".tabnav-tabs a:has(> svg.octicon-comment-discussion)";
        this.elementID = new ElementID(201);
    }
}
