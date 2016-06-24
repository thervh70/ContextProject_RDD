/**
 * This class connects to the RESTful API made by Aaron.
 */

class RESTApiDatabaseAdapter implements DatabaseAdaptable {

    private _initialized: boolean = false;
    private _owner: string;
    private _repo: string;
    private _pr: number;

    /**
     * Maps EventObject.type to an API endpoint in the Database.
     */
    private endPoints: any = {
        "HTMLPageEvent": "html-pages",
        "KeystrokeEvent": "keystroke-events",
        "MouseClickEvent": "mouse-click-events",
        "MousePositionEvent": "mouse-position-events",
        "MouseScrollEvent": "mouse-scroll-events",
        "SemanticEvent": "semantic-events",
        "TabChangeEvent": "change-tab-events",
        "WindowResolutionEvent": "window-resolution-events",
    };

    /**
     * Constructs the RESTApiDatabaseAdapter
     * @param _databaseUrl      The URL to connect to, on this address the server should be running.
     * @param _prUrl            A URL to a pull request.
     * @param _user             The username of the user on GitHub.
     * @param _debug = false    When this is true, verbose logging will be used.
     */
    constructor(private _databaseUrl: string, private _prUrl: string, private _user: string, private _debug = false) {
        this._databaseUrl = URLHandler.formatUrl(_databaseUrl);
        const urlInfo = URLHandler.getPullRequestUrlFields(_prUrl);
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
    public post(eventData: EventObject, success: Callback, failure: Callback): void {
        let newSuccess = success;
        if (eventData.type === "SemanticEvent") {
            const data = <SemanticEvent>eventData.data;
            if (data.commit_hash !== undefined && data.filename !== undefined && data.line_number !== undefined) {
                // Override callback if a semanticEvent contains diff / line number information.
                // Old callback will be called when this call is done.
                newSuccess = (semanticEventDataResult) => {
                    this.postEvent({
                        commit_hash: data.commit_hash,
                        filename: data.filename,
                        line_number: data.line_number,
                        semantic_event: semanticEventDataResult.id,
                    }, "file-positions", success, failure);
                };
            }
        }
        this.postEvent(this.processEventObject(eventData), this.endPoints[eventData.type], newSuccess, failure);
    }

    /**
     * Formats the EventObject such that it can be posted to the database.
     * EventID and ElementID objects are not compatible with the JSON representation in the database, so they are removed here.
     * @param eventData the EventObject to process.
     * @returns {any} the JSON-compatible formatted data that is going to be posted to the database.
     */
    private processEventObject(eventData: EventObject): any {
        switch (eventData.type) {
            case "SemanticEvent":
                const semanticData = <SemanticEvent>eventData.data;
                return {
                    "event_type": semanticData.eventID.getEventID(),
                    "element_type": semanticData.elementID.getElementID(),
                    "created_at": semanticData.created_at,
                };
            case "KeystrokeEvent":
                const keystrokeData = <KeystrokeEvent>eventData.data;
                if (keystrokeData.keystroke === " ") {
                    keystrokeData.keystroke = "Space";
                }
                return keystrokeData;
            default:
                return this.processRounding(eventData.data);
        }
    }

    /**
     * Round all necessary fields to integers. Necessary to stay compatible with the database.
     * A list of all items that can occur in an EventObjectData is given. For each of these 'candidates'
     * it is checked whether it is contained in the given EventDataObject and if so, rounded.
     * @param eventData The data to be send to the database.
     */
    private processRounding(eventData: EventObjectData): any {
        const roundCandidates: string[] = ["position_x", "position_y", "viewport_x", "viewport_y"];
        let candidate: string;
        const indexableEventData = <{[name: string]: number; }>(<any>eventData);
        for (let i = 0; i < roundCandidates.length; i++) {
            candidate = roundCandidates[i];
            if (indexableEventData[candidate] !== undefined) {
                indexableEventData[candidate] = Math.round(indexableEventData[candidate]);
            }
        }
        return eventData;
    }

    /**
     * Post any event data object to the database.
     * @param eventData     The data to post to the database.
     * @param eventURL      The event will be posted to `<database>/api/<eventURL>/`.
     * @param success       Callback, which is called once the call has succeeded.
     * @param failure       Callback, which is called once the call has failed.
     */
    private postEvent(eventData: any, eventURL: string, success: Callback, failure: Callback) {
        if (!this.isInitialized) {
            Logger.warn("The database has not been initialized yet!");
            failure();
            return;
        }
        const postData = this.createJSONPost(eventData);
        this.postWithAjax(postData, eventURL, success, failure);
    }

    /**
     * Perform an AJAX call which posts the event data to the database..
     * @param postData      A JQueryAjaxSettings object to pass to the AJAX call.
     * @param eventURL      The event will be posted to `<database>/api/<eventURL>/`.
     * @param success       Callback, which is called once the call has succeeded.
     * @param failure       Callback, which is called once the call has failed.
     */
    private postWithAjax(postData: JQueryAjaxSettings, eventURL: string, success: Callback, failure: Callback) {
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

    /**
     * Get a session object based on the URL of the Pull Request and the username.
     * @returns {Object} a Session object that complies with the REST API: `/api/sessions`
     */
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
