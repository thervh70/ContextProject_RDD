/**
 * Created by Maarten on 12-06-2016.
 * 
 * A HTMLPageEvent contains the data that should be posted to a Database.
 * @param dom           the DOM at the moment of the event.
 * @param created_at    when the event was created.
 */
interface HTMLPageEvent {
    dom: string;
    created_at: UnixTimestamp;
}
