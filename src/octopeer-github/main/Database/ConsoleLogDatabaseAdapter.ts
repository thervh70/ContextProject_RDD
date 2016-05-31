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
    public postSemantic(eventData: SemanticEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postKeystroke(eventData: KeystrokeEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postMousePosition(eventData: MousePositionEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postMouseClick(eventData: MouseClickEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postMouseScroll(eventData: MouseScrollEvent) {
        Logger.database(eventData);
    }

    /**
     * @param eventData The data to log to the console.
     */
    public postWindowResolution(eventData: WindowResolutionEvent) {
        Logger.database(eventData);
    }

}
