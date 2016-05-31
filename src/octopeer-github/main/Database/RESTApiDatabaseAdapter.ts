/// <reference path="./DatabaseAdaptable/SemanticDatabaseAdaptable.ts"/>

/**
 * This class connects to the RESTful API made by Aaron.
 */

class RESTApiDatabaseAdapter implements DatabaseAdaptable {

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

    public postKeystroke(eventData: KeystrokeEvent, success: Callback, failure: Callback) {
        this.postEvent(eventData, "keystroke-events", success, failure);
    }

    public postMouseClick(eventData: MouseClickEvent, success: Callback, failure: Callback) {
        this.postEvent(eventData, "mouse-click-events", success, failure);
    }

    public postMousePosition(eventData: MousePositionEvent, success: Callback, failure: Callback) {
        this.postEvent(eventData, "mouse-position-events", success, failure);
    }

    public postMouseScroll(eventData: MouseScrollEvent, success: Callback, failure: Callback) {
        this.postEvent(eventData, "mouse-scroll-events", success, failure);
    }

    public postWindowResolution(eventData: WindowResolutionEvent, success: Callback, failure: Callback) {
        this.postEvent(eventData, "window-resolution-events", success, failure);
    }

    /**
     * Post an event to the database.
     * @param eventData     The data to post to the database.
     * @param success       Callback, which is called once the call has succeeded.
     * @param failure       Callback, which is called once the call has failed.
     */
    public postSemantic(eventData: SemanticEvent, success: Callback, failure: Callback): void {
        this.postEvent({
            "event_type": `${this._databaseUrl}api/event-types/${eventData.eventID}/`,
            "element_type": `${this._databaseUrl}api/element-types/${eventData.elementID}/`,
            "created_at": eventData.created_at,
        }, "semantic-events", success, failure);
    }

    private postEvent(eventData: any, eventURL: string, success: Callback, failure: Callback) {
        const postData = this.createJSONPost(eventData);
        this.postWithAjax(postData, eventURL, success, failure);
    }

    private postWithAjax(postData: JQueryAjaxSettings, eventURL: string, success: Callback, failure: Callback) {
        if (!this.isInitialized) {
            Logger.warn("The database has not been initialized yet!");
            failure();
            return;
        }
        $.ajax(`${this._databaseUrl}api/${eventURL}/`, postData)
            .done((data, status, jqXHR) => {
                if (this._debug) {
                    Logger.debug(`Call success, status: ${status}`);
                    Logger.debug(jqXHR);
                    Logger.debug(postData);
                }
                success(data, status, jqXHR);
            })
            .fail((jqXHR, status) => {
                Logger.warn(`Database post to ${eventURL} failed, status: ${status}`);
                Logger.debug(jqXHR);
                Logger.debug(postData);
                failure(jqXHR, status);
            });
    }

    /**
     * Creates a Settings Object that can be used in an AJAX request.
     * @param data                  The data that will be posted to the server.
     * @returns JQueryAjaxSettings  A Settings Object that can be used in an AJAX request.
     */
    private createJSONPost(data: any): JQueryAjaxSettings {
        data.session = this.getSession();
        return {
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: "json",
            type: "POST",
        };
    }

    private getSession() {
        return {
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
        };
    }

}
