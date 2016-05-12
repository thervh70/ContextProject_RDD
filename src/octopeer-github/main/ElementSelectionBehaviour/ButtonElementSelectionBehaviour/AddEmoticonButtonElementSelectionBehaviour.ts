/**
 * Created by Mathias on 2016-05-11.
 * Class for selections the AddEmoticonButton
 */
class AddEmoticonButtonElementSelectionBehaviour extends ButtonElementSelectionBehaviour {

    /**
     * Constructor of this class.
     * @param database The database that is used to store the Elements.
     */
    public constructor(database: DatabaseAdaptable) {
        super(database);
        this.elementDsc = "[placeholder]";
        this.elementID = new ElementID(110);
    }
}
