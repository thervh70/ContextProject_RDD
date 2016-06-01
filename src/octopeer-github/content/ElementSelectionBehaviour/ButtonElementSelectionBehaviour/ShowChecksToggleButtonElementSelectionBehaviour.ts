/// <reference path="../AbstractElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the ShowChecks button
 */
class ShowChecksToggleButtonElementSelectionBehaviour extends AbstractElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database, ElementID.SHOW_CI_CHECKS_TOGGLE, ".merge-pr button.js-details-target:has(span)");
    }
}