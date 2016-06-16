/**
 * Created by Mathias on 2016-06-16.
 */

describe("The isInScope function of AuxiliaryAddDOMEventFunctions", function () {
    it("should return true when a ClientRect is in between a given width and a given height", function () {
        const clientRectMock = <ClientRect>{
            bottom: 200,
            left: 30,
            right: 60,
            top: 100,
        };
        expect(AuxiliaryAddDOMEventFunctions.isInScope(40, 150, clientRectMock)).toEqual(true);
    });

    it("should return false when a ClientRect is in not between a given width and a given height", function () {
        const clientRectMock = <ClientRect>{
            bottom: 200,
            left: 30,
            right: 60,
            top: 100,
        };
        expect(AuxiliaryAddDOMEventFunctions.isInScope(20, 80, clientRectMock)).toEqual(false);
    });
});
