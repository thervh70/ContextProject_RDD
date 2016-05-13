/// <reference path="SettingElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Unsubscribe setting
 */
class UnsubscribeSettingElementSelectionBehaviour extends SettingElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = "#partial-discussion-sidebar button:has(svg.octicon-mute)";
        this.elementID = new ElementID(404);
    }
}
