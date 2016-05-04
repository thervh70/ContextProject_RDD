/**
 * Created by Youri on 03/05/2016.
 */

class SelectButtonsElementSelectionBehaviour implements ElementSelectionBehaviour {
    getElementId() {
        return 1;
    }
    getElements() {
        return $('.button');
    }
}
