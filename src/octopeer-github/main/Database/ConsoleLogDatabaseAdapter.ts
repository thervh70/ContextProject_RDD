/**
 * Created by Youri on 04/05/2016.
 * Semi-mock class for being able to check implementation completeness.
 */
class ConsoleLogDatabaseAdapter implements DatabaseAdaptable {

    /**
     * Simple boolean to keep track of the raw data output.
     */
    private static outputRawData = true;

    /**
     * Set the raw data switch for the console.
     * @bool the new value.
     */
    public static setRawData(bool: boolean) {
        ConsoleLogDatabaseAdapter.outputRawData = bool;
    }

    /**
     * Get raw data value.
     * @returns raw data value.
     */
    public static getRawData() {
        return ConsoleLogDatabaseAdapter.outputRawData;
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
     */
    public filterRawData(eventData: any) {
        if (ConsoleLogDatabaseAdapter.outputRawData) {
            Logger.database(eventData);
        }
    }

}
