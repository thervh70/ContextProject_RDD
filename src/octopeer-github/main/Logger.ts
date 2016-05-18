/**
 * Created by Maarten on 17-05-2016.
 */

const Logger = new (class Logger {

    private isDebug = false;

    public log(obj: any) {
        this._log("WARN ", obj);
    }

    public debug(obj: any) {
        if (this.isDebug) {
            this._log("DEBUG", obj);
        }
    }

    public database(obj: any) {
        this._log("DATA ", obj);
    }

    public setDebug(state = true) {
        this.isDebug = state;
    }

    private _log(tag: string, obj: any) {
        console.log(`[${tag}] `, obj);
    }

})();
Logger.debug(""); // Suppress unused variable `Logger`
