/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ScrollOutOfViewElementEventBinding class.
 */

describe("A ScrollOutOfViewElementEventBinding's", function() {

    it("type should be retrieved when the getEventType function is called", function() {
        selector = new InlineCommentTextFieldElementSelectionBehaviour(database);
        binder = new ScrollOutOfViewElementEventBinding(selector);
        expect(binder.getEventType()).toBe("scrolloutofview");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = new PRCreatorNameElementSelectionBehaviour(database);
        binder = new ScrollOutOfViewElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(302));
    });
});
