/**
 * Created by Mathias on 2016-06-15.
 * 
 * A TabChangeEvent contains the tab change data that shoud be posted to the database.
 * @param timestamp     when the event was created.
 */
interface TabChangeEvent {
    created_at: UnixTimestamp;
}
