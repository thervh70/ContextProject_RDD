/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the OtherContributer name
 */
class OtherContributerNameElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        // TODO: Fix the jQuery selector
        super(database, ElementID.OTHER_CONTRIBUTOR, "teststss");
    }
}
