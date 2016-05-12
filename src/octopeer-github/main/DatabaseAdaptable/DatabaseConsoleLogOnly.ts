/**
 * Created by Youri on 04/05/2016.
 */
/**
 * Semi-mock class for being able to check implementation completeness.
 */
class DatabaseConsoleLogOnly implements DatabaseAdaptable {

    /**
     * @param eventData The data to log to the database.
     */
    public log(eventData: EventObject) {
        console.log(eventData);
    }

}
