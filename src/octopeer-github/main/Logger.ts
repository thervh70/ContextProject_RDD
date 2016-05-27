/**
 * Created by Maarten on 17-05-2016.
 */

/**
 * The Logger class (singleton) is used to log events to the console.
 * The Logger will not output debug messages if this is not explicitly requested.
 */
/* tslint:disable:no-unused-variable */
const Logger = new (class Logger {

    private isDebug = false;

    /**
     * Logs a warning to the console.
     * @param obj The object to be logged.
     */
    public warn(obj: any) {
        this.log("WARN ", obj);
    }

    /**
     * Logs a debug message to the console.
     * @param obj The object to be logged.
     */
    public debug(obj: any) {
        if (this.isDebug) {
            this.log("DEBUG", obj);
        }
    }

    /**
     * Logs a database post to the console. (only used by ConsoleLogDatabaseAdapter)
     * @param obj The object to be logged.
     */
    public database(obj: any) {
        this.log("DATA ", obj);
    }

    /**
     * If debug = true, the Logger will log debug messages.
     * @state state=true The new debug state.
     */
    public setDebug(state = true) {
        this.isDebug = state;
    }

    /**
     * Logs a warning to the console.
     * @param tag The tag that this log will get.
     * @param obj The object to be logged.
     */
    private log(tag: string, obj: any) {
        console.log(`[${tag}] `, obj);
    }

})();
/* tslint:enable:no-unused-variable */
