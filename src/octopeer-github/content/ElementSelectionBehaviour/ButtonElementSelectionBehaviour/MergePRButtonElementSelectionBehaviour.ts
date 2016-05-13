/// <reference path="ButtonElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the MergePRButton
 */
class MergePRButtonElementSelectionBehaviour extends ButtonElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".js-merge-branch-action";
        this.elementID = new ElementID(101);
    }
}
