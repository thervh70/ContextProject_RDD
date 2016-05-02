///<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>

class DatabaseAdapter {

    private _url: string;
    private _session: number;
    private _initialized: boolean;

    constructor(url: string) {
        this._url = url;
        if (this._url.charAt(this._url.length - 1) != "/") {
            this._url += "/";
        }
        this._session = 1;
        this._initialized = true;
    }

    get url(): string {
        return this._url;
    }

    public post(eventType: number, start: Date, duration: number, success: JQueryPromiseCallback<any>): void {
        $.ajax(`${this.url}api/events/`, {
                type: "POST",
                dataType: "json",
                data: {
                    "started_at": start.toJSON(),
                    "duration": duration,
                    "session": `${this.url}api/sessions/${this._session}/`,
                    "event_type": `${this.url}api/event-types/${eventType}/`
                }
            })
            .done(success)
            .fail(function(jqXHR, status) {console.log(`Call failed, status: ${status}`); console.log(jqXHR);}).done();
    }

}
