/**
 * Created by Youri on 04/05/2016.
 * Semi-mock class for being able to check implementation completeness.
 */
class ConsoleLogDatabaseAdapter implements DatabaseAdaptable {

    /**
     * Simple boolean to keep track of the raw data logging.
     */
    private static rawDataLogging = true;

    /**
     * Set the raw data switch for the console.
     * By default the console will show raw data.
     * @logging the new value.
     */
    public static setRawDataLogging(logging = true) {
        ConsoleLogDatabaseAdapter.rawDataLogging = logging;
    }

    /**
     * Get raw data logging value.
     * @returns raw data logging value.
     */
    public static getRawDataLogging() {
        return ConsoleLogDatabaseAdapter.rawDataLogging;
    }

    /**
     * @param eventData The data to log to the console.
     */
    public post(eventData: EventObject) {
        if (eventData.type === "SemanticObject" || ConsoleLogDatabaseAdapter.rawDataLogging) {
            Logger.database(eventData);
        }
    }

}
