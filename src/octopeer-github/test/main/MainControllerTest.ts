/**
 * Created by Mitchell on 26-5-2016.
 * Behaviour unit tests for the MainController class.
 */

let testMainController: MainController;

describe("The MainController, when started by the start function,", function() {
    let spyConnectCS: jasmine.Spy;
    let spyStandby: jasmine.Spy;
    let spyOptionsInit: jasmine.Spy;
    let spyOptionsUpdate: jasmine.Spy;
    let spyOptionsObserver: jasmine.Spy;

    beforeEach(function () {
        testMainController = new MainController();
        spyStandby = spyOn(Status, "standby");
        spyOptionsInit = spyOn(Options, "init");
        spyOptionsUpdate = spyOn(Options, "update");
        spyOptionsObserver = spyOn(Options, "addObserver");
    });

    it("should call the right functions", function () {
        spyConnectCS = spyOn(testMainController, "connectToContentScript");
        testMainController.start();

        expect(spyConnectCS).toHaveBeenCalled();
        expect(spyStandby).toHaveBeenCalled();
        expect(spyOptionsInit).toHaveBeenCalled();
        expect(spyOptionsUpdate).toHaveBeenCalled();
        expect(spyOptionsObserver).toHaveBeenCalled();
        expect(spyOptionsObserver).toHaveBeenCalledWith(testMainController);
    });

    it("should return the right object", function () {
        spyConnectCS = spyOn(testMainController, "connectToContentScript");
        testMainController.start();

        // checks whether the object contains the right properties.
        expect(testMainController.start()).toEqual(jasmine.objectContaining({
            database: new ConsoleLogDatabaseAdapter(),
        }));
    });

    it("the connectToContentScript helper method, should call the right functions", function () {
        const spies = desiredSpies([true, true, true, true]);
        testMainController.start();

        expect(spies[0]).toHaveBeenCalled();
        expect(spies[1]).toHaveBeenCalled();
        expect(spies[2]).toHaveBeenCalled();
        expect(spies[3]).toHaveBeenCalled();
    });

    // TODO: Add tests with chrome function mocks.
});

/**
 * Adds the spies that are desired to an array.
 * This function simplifies spy creation within test cases, as most spies are desired, but not always all of them.
 * @param spyRequest an array consisting of booleans, indicating the desired spies.
 * @returns {jasmine.Spy[]} the desired spies.
 */
function desiredSpies(spyRequest: boolean[]) {
    // Spies for MainController private functions.
    let spyReturn: jasmine.Spy[];
    spyReturn = [];
    const spyInitCurTabs = spyOn(testMainController, "initAllCurrentTabs");
    const spyRehookOnUpdate = spyOn(testMainController, "rehookOnUpdate");
    const spyRehookOnFocus = spyOn(testMainController, "rehookOnFocusChange");
    const spyListenDBMessages = spyOn(testMainController, "listenToDatabaseMessages");
    if (spyRequest[0]) {
        spyReturn.push(spyInitCurTabs);
    }
    if (spyRequest[1]) {
        spyReturn.push(spyRehookOnUpdate);
    }
    if (spyRequest[2]) {
        spyReturn.push(spyRehookOnFocus);
    }
    if (spyRequest[3]) {
        spyReturn.push(spyListenDBMessages);
    }
    return spyReturn;
}
