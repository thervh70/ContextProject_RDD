/**
 * Created by Youri on 04/05/2016.
 */
/**
 * Semi-mock class for being able to check implementation completeness.
 */
class ConsoleLogDatabaseAdapter implements DatabaseAdaptable {

    /**
     * @param eventData The data to log to the console.
     */
    public post(eventData: IEventObject) {
        Logger.database(eventData);
    }

}
