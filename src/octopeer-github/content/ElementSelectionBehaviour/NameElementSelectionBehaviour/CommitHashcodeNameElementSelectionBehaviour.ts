/// <reference path="NameElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the CommitHashcode name
 */
class CommitHashcodeNameElementSelectionBehaviour extends NameElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".commit-id";
        this.elementID = new ElementID(301);
    }
}
