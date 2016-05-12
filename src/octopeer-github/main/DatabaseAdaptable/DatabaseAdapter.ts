/// <reference path="../Types/ElementID.ts"/>
/// <reference path="../Types/EventID.ts"/>
/**
 * This class connects to the RESTful API made by Aaron.
 */

class DatabaseAdapter implements DatabaseAdaptable {

    private _session: number = -1;

    // TODO The PR id and UserID should be get from the context
    /**
     * Constructs the DatabaseAdapter
     * @param _url              The URL to connect to, on this address the server should be running.
     * @param _user             The ID of the User in the database.
     * @param _pr               The ID of the PR in the database.
     * @param _debug = false    When this is true, verbose logging will be used.
     */
    constructor(private _url: string, private _user: number, private _pr: number, private _debug = false) {
        const self = this; // scope 'self' to be the adapter (instead of the AJAX call)
        self._url = self.formatUrl(self._url);

        $.ajax(`${self.url}api/sessions/`, self.createPostSession())
            .done(function(data, status, jqXHR) {
                self._session = self.getSessionFromUrl(data.url);
                if (self._debug) {
                    console.log(`Initialized DatabaseAdapter(${_url}, session=${self._session})`, self);
                }
            })
            .fail(function(jqXHR, status) {
                console.log(`[WARN] DatabaseAdapter could not connect to ${self.url}.`, jqXHR);
            });
        if (self._debug) {
            console.log(`Constructed DatabaseAdapter(${_url})`, self);
        }
    }

    get url(): string {
        return this._url;
    }

    get isInitialized(): boolean {
        return this._session !== -1;
    }

    get session(): number {
        return this._session;
    }

    /**
     * Sets the verbose logging.
     * @param d = true      Whether verbose logging should be used.
     */
    public setDebug(d = true) {
        this._debug = d;
    }

    /**
     * Post an event to the database.
     * @param eventData     The data to log to the database.
     * @param success       Callback, which is called once the call has succeeded.
     * @param failure       Callback, which is called once the call has failed.
     */
    public log(eventData: EventObject, success: Callback, failure: Callback): void {
        const self = this;
        if (!this.isInitialized) {
            console.log("[WARN] The database has not been initialized yet!");
            return;
        }
        const ajax = $.ajax(`${this.url}api/events/`, self.createPostData(eventData))
            .done(function(data, status, jqXHR) {
                if (self._debug) {
                    console.log(`Call success, status: ${status}`, jqXHR);
                }
                success(data, status, jqXHR);
            })
            .fail(function(jqXHR, status) {
                console.log(`[WARN] Call failed, status: ${status}`, jqXHR);
                failure(jqXHR, status);
            });
        if (self._debug) {
            console.log("Sent out AJAX request: ", ajax);
        }
    }

    /**
     * Creates a Settings Object that can be used in an AJAX request when posting a new session.
     * @returns {JQueryAjaxSettings}    A Settings Object that can be used in an AJAX request.
     */
    private createPostSession() {
        return this.createJSONPost({
            "platform": "GitHub",
            "pull_request": `${this.url}api/pull-requests/${this._pr}/`,
            "user": `${this.url}api/users/${this._user}/`,
        });
    }

    /**
     * Creates a Settings Object that can be used in an AJAX request when posting an event.
     * @param eventData                 The data to log to the database.
     * @returns {JQueryAjaxSettings}    A Settings Object that can be used in an AJAX request.
     */
    private createPostData(eventData: EventObject) {
        return this.createJSONPost({
            "started_at": eventData.start.toJSON(),
            "duration": eventData.duration,
            "session": `${this.url}api/sessions/${this._session}/`,
            "event_type": `${this.url}api/event-types/${eventData.eventID.getEventID()}/`,
        });
    }

    /**
     * Creates a Settings Object that can be used in an AJAX request.
     * @param data                  The data that will be posted to the server.
     * @returns JQueryAjaxSettings  A Settings Object that can be used in an AJAX request.
     */
    private createJSONPost(data: Object): JQueryAjaxSettings {
        return {
            data: data,
            dataType: "json",
            type: "POST",
        };
    }

    /**
     * Appends a trailing slash to the URL if there is no trailing slash yet.
     * @param url           The URL to format.
     * @returns {string}    A formatted URL.
     */
    private formatUrl(url: string) {
        if (url.charAt(url.length - 1) !== "/") {
            url += "/";
        }
        return url;
    }

    /**
     * Gets the session ID from the URL.
     * @param url           The URL to get the session ID from.
     * @returns {Number}    The session ID.
     */
    private getSessionFromUrl(url: string) {
        let suburl = url.substr(0, url.length - 1);             // trim trailing slash
        suburl = suburl.substr(suburl.lastIndexOf("/") + 1);    // substring starting from the character after the last "/"
        return Number(suburl);
    }

}
