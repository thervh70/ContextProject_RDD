class DatabaseAdapter {

    private _url: string;
    private _session: number;
    private _pr: number;
    private _user: number;
    private _initialized: boolean;
    private _debug: boolean;

    constructor(url: string, debug = false) {
        const self = this; // scope 'self' to be the adapter (instead of the AJAX call)
        self._debug = debug;
        self._user = 1;
        self._pr = 1;   // TODO The PR id should be get from the context and probably set via the constructor
        self._session = -1;
        self._initialized = false;

        self._url = url;
        if (self._url.charAt(this._url.length - 1) !== "/") {
            self._url += "/";
        }

        $.ajax(`${self.url}api/sessions/`, {
                data: {
                    "platform": "GitHub",
                    "pull_request": `${this.url}api/pull-requests/${this._pr}/`,
                    "user": `${this.url}api/users/${this._user}/`,
                },
                dataType: "json",
                type: "POST",
            })
            .done(function(data, status, jqXHR) {
                let suburl = data.url.substr(0, data.url.length - 1); // trim trailing slash
                suburl = suburl.substr(suburl.lastIndexOf("/") + 1);  // substring starting from the character after the last "/"
                self._session = Number(suburl);
                self._initialized = true;
                if (this._debug) {
                    console.log(`Initialized DatabaseAdapter(${url}, session=${self._session})`, self);
                }
            })
            .fail(function(jqXHR, status) {
                console.log(`[WARN] DatabaseAdapter could not connect to ${self.url}.`, jqXHR);
            });
        if (this._debug) {
            console.log(`Constructed DatabaseAdapter(${url})`, self);
        }
    }

    get url(): string {
        return this._url;
    }

    get isInitialized(): boolean {
        return this._initialized;
    }

    get session(): number {
        return this._session;
    }

    public setDebug(d = true) {
        this._debug = d;
    }

    public post(eventType: number, start: Date, duration: number, success: JQueryPromiseCallback<any>): void {
        const self = this;
        const ajax = $.ajax(`${this.url}api/events/`, {
                data: {
                    "started_at": start.toJSON(),
                    "duration": duration,
                    "session": `${this.url}api/sessions/${this._session}/`,
                    "event_type": `${this.url}api/event-types/${eventType}/`,
                },
                dataType: "json",
                type: "POST",
            })
            .done(function(data, status, jqXHR) {
                if (self._debug) {
                    console.log(`Call success, status: ${status}`, jqXHR);
                }
                success(data, status, jqXHR);
            })
            .fail(function(jqXHR, status) {
                console.log(`[WARN] Call failed, status: ${status}`, jqXHR);
            });
        if (this._debug) {
            console.log("Sent out AJAX request: ", ajax);
        }
    }

}
