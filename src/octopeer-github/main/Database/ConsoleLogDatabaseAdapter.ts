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
    public static setRawData(logging = true) {
        ConsoleLogDatabaseAdapter.rawDataLogging = logging;
    }

    /**
     * Get raw data value.
     * @returns raw data value.
     */
    public static getRawData() {
        return ConsoleLogDatabaseAdapter.rawDataLogging;
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postSemantic(eventData: ISemanticEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postKeystroke(eventData: IKeystrokeEvent) {
        this.filterRawData(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postMousePosition(eventData: IMousePositionEvent) {
        this.filterRawData(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postMouseClick(eventData: IMouseClickEvent) {
        this.filterRawData(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postMouseScroll(eventData: IMouseScrollEvent) {
        this.filterRawData(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postWindowResolution(eventData: IWindowResolutionEvent) {
        this.filterRawData(eventData);
    }

    /**
     * Raw data filter method.
     * It checks whether the raw data logging is enabled and will then output the eventdata.
     * If the raw data logging is disabled this method will do nothing.
     * @param eventData The data that will be passed
     */
    private filterRawData(eventData: any) {
        if (ConsoleLogDatabaseAdapter.rawDataLogging) {
            Logger.database(eventData);
        }
    }

}
