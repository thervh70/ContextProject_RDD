/// <reference path="./DatabaseAdaptable/SemanticDatabaseAdaptable.ts"/>

/**
 * This class connects to the RESTful API made by Aaron.
 */

class RESTApiDatabaseAdapter implements SemanticDatabaseAdaptable { // TODO implement Database in another branch

    private _initialized: boolean = false;
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
        this._databaseUrl = URLHandler.formatUrl(_databaseUrl);
        const urlInfo = URLHandler.isPullRequestUrl(_prUrl);
        if (urlInfo.equals([])) {
            Logger.warn("Not a valid PR URL: " + _prUrl);
            return;
        }
        this._owner = urlInfo[1];
        this._repo = urlInfo[2];
        this._pr = Number(urlInfo[3]);
        this._initialized = true;
        if (_debug) {
            Logger.debug(`Constructed DatabaseAdapter(${_databaseUrl})`);
            Logger.debug(this);
        }
    }

    /**
     * @returns {boolean} whether `this` is initialized, i.e. ready to receive post-requests.
     */
    get isInitialized(): boolean {
        return this._initialized;
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
    public postSemantic(eventData: SemanticEvent, success: Callback, failure: Callback): void {
        const self = this;
        if (!this.isInitialized) {
            Logger.warn("The database has not been initialized yet!");
            failure();
            return;
        }
        const postData = self.createPostData(eventData);
        $.ajax(`${this._databaseUrl}api/semantic-events/`, postData)
            .done(function(data, status, jqXHR) {
                if (self._debug) {
                    Logger.debug(`Call success, status: ${status}`);
                    Logger.debug(jqXHR);
                    Logger.debug(postData);
                }
                success(data, status, jqXHR);
            })
            .fail(function(jqXHR, status) {
                Logger.warn(`Database post failed, status: ${status}`);
                Logger.debug(jqXHR);
                Logger.debug(postData);
                failure(jqXHR, status);
            });
    }

    /**
     * Creates a Settings Object that can be used in an AJAX request when posting an event.
     * @param eventData                 The data to post to the database.
     * @returns {JQueryAjaxSettings}    A Settings Object that can be used in an AJAX request.
     */
    private createPostData(eventData: SemanticEvent) {
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
                },
            },
            "event_type": `${this._databaseUrl}api/event-types/${eventData.eventID}/`,
            "element_type": `${this._databaseUrl}api/element-types/${eventData.elementID}/`,
            "started_at": eventData.start / 1000,
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
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: "json",
            type: "POST",
        };
    }

}
