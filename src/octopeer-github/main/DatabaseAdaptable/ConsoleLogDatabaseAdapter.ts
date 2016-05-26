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
    public postSemantic(eventData: ISemanticEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postKeystroke(eventData: IKeystrokeEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postMousePosition(eventData: IMousePositionEvent) {
        Logger.database(eventData);
    }

}
