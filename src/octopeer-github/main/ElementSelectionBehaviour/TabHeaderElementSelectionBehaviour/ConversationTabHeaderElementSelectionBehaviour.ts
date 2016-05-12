/// <reference path="TabHeaderElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Conversation tab header
 */
class ConversationTabHeaderElementSelectionBehaviour extends TabHeaderElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = "[placeholder]";
        this.elementID = new ElementID(201);
    }
}
