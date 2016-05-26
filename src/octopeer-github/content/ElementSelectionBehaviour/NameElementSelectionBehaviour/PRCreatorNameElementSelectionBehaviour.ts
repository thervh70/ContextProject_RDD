/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the PRCreator name
 */
class PRCreatorNameElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        // TODO: Fix the jQuery selector
        super(database, ElementID.PR_CREATOR, "testtttt");
    }
}
