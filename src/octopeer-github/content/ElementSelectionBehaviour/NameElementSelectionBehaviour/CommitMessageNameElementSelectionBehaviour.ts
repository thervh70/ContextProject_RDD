/// <reference path="NameElementSelectionBehaviour.ts"/>
/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the CommitMessage name
 */
class CommitMessageNameElementSelectionBehaviour extends NameElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = ".commit-message a";
        this.elementID = new ElementID(302);
    }
}