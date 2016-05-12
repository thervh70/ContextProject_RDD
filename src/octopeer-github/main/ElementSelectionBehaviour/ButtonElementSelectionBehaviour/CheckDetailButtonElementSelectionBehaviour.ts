/**
 * Created by Mathias on 2016-05-11.
 * Class for selecting the CheckDetail button
 */
class CheckDetailButtonElementSelectionBehaviour extends ButtonElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = "[placeholder]";
        this.elementID = new ElementID(112);
    }
}
