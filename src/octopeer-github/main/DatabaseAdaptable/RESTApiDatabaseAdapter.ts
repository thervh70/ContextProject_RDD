/// <reference path="../DatabaseAdaptable/DatabaseAdaptable.ts"/>

/**
 * This class connects to the RESTful API made by Aaron.
 */

class RESTApiDatabaseAdapter implements DatabaseAdaptable {

    private _session: number = -1;
    private _owner: string;
    private _repo: string;
    private _pr: number;

    /**
     * Constructs the RESTApiDatabaseAdapter
     * @param _databaseUrl      The URL to connect to, on this address the server should be running.
     * @param _prUrl            A URL to a pull request.
     * @param _user             The username of the user on GitHub.
     * @param _debug = false    When this is true, verbose logging will be used.
     */
    constructor(private _databaseUrl: string, private _prUrl: string, private _user: string, private _debug = false) {
        _databaseUrl = URLHandler.formatUrl(_databaseUrl);
        const urlInfo = URLHandler.isPullRequestUrl(_prUrl);
        if (urlInfo === []) {
            Logger.warn("Not a valid PR URL: " + _prUrl);
            return;
        }
        this.fetchSessionId();
        if (_debug) {
            Logger.debug(`Constructed DatabaseAdapter(${_databaseUrl})`);
            Logger.debug(self);
        }
    }

    private fetchSessionId() {
        const self = this; // scope 'self' to be the adapter (instead of the AJAX call)
        $.ajax(`${self.url}api/sessions/`, self.createPostSession())
            .done(function(data, status, jqXHR) {
                self._session = URLHandler.getSessionFromUrl(data.url);
                if (self._debug) {
                    Logger.debug(`Initialized DatabaseAdapter(${self.url}, session=${self._session})`);
                    Logger.debug(self);
                }
            })
            .fail(function(jqXHR, status) {
                Logger.warn(`DatabaseAdapter could not connect to ${self.url}.`);
                Logger.debug(jqXHR);
            });
    }

    get url(): string {
        return this._databaseUrl;
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
     * @param eventData     The data to post to the database.
     * @param success       Callback, which is called once the call has succeeded.
     * @param failure       Callback, which is called once the call has failed.
     */
    public post(eventData: IEventObject, success: Callback, failure: Callback): void {
        const self = this;
        if (!this.isInitialized) {
            Logger.warn("The database has not been initialized yet!");
            return;
        }
        $.ajax(`${this.url}api/semantic-events/`, self.createPostData(eventData))
            .done(function(data, status, jqXHR) {
                if (self._debug) {
                    Logger.debug(`Call success, status: ${status}`);
                    Logger.debug(jqXHR);
                }
                success(data, status, jqXHR);
            })
            .fail(function(jqXHR, status) {
                Logger.warn(`Database post failed, status: ${status}`);
                Logger.debug(jqXHR);
                failure(jqXHR, status);
            });
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
     * @param eventData                 The data to post to the database.
     * @returns {JQueryAjaxSettings}    A Settings Object that can be used in an AJAX request.
     */
    private createPostData(eventData: IEventObject) {
        return this.createJSONPost({
            "session": {
                "pull_request": {
                    "repository": {
                        "owner": this._owner,
                        "name": this._repo,
                        "platform": "GitHub",
                    },
                    "pull_request_number": this._pr,
                },
                "user": {
                    "username": this._user,
                }
            },
            "event_type": `${this.url}api/event-types/${eventData.eventID}/`,
            "element_type": `${this.url}api/event-types/${eventData.elementID}/`,
            "started_at": eventData.start,
            "duration": eventData.duration,
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

}
