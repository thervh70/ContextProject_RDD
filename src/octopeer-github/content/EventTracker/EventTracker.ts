/**
 * Created by Maarten on 08-06-2016.
 */
interface EventTracker {

    /**
     * Initiates this EventTracker to collect event data.
     */
    addDOMEvent: () => void;

    /**
     * Stops this EventTracker from collecting event data.
     */
    removeDOMEvent: () => void;
}
