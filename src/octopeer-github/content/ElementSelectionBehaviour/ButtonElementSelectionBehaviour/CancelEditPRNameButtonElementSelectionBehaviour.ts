/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the CancelEditPRName button
 */
class CancelEditPRNameButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database, ElementID.CANCEL_EDIT_PRNAME, "#partial-discussion-header.open .gh-header-edit button.js-details-target");
    }
}
