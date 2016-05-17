/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Milestone setting
 */
class MilestoneSettingElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = "#partial-discussion-sidebar button[data-hotkey=m]";
        this.elementID = new ElementID(402);
    }
}
