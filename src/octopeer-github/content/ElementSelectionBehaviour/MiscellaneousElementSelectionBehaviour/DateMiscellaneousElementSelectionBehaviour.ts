/// <reference path="MiscellaneousElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the Date
 */
class DateMiscellaneousElementSelectionBehaviour extends MiscellaneousElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = "relative-time";
        this.elementID = new ElementID(501);
    }
}