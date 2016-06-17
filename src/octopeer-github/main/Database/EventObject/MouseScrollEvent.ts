/**
 * Created by Maarten on 26-05-2016.
 * 
 * A MouseScrollEvent contains the data that should be posted to a Database.
 * @param viewport_x    indicates the x-position of the current viewport.
 * @param viewport_y    indicates the y-position of the current viewport.
 * @param created_at    when the event was created.
 */
interface MouseScrollEvent {
    viewport_x: number;
    viewport_y: number;

    created_at: UnixTimestamp;
}
