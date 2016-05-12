/// <reference path="SettingElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the LockConversation setting
 */
class LockConversationSettingElementSelectionBehaviour extends SettingElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = "#partial-discussion-sidebar a:has(svg.octicon-lock)";
        this.elementID = new ElementID(405);
    }
}
