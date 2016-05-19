/**
 * Most basic interface ever.
 * Yet it enables the backend to listen to the options class.
 * Created by Robin on 19-5-2016.
 */

interface OptionsObserver {
    notify(): void;
}
