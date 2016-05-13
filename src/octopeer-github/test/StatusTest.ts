// /// <reference path="../main/Status.ts"/>
//
// /**
//  * Created by Robin on 12-5-2016.
//  */
//
// describe("A Status code is saved", function () {
//     let status: Status;
//
//     beforeEach(function () {
//         status = new Status();
//
//         this.fakeChromeStorage = {};
//         chrome = { storage: { sync: {get: function() {}, set: function() {}}}};
//         spyOn(chrome.storage.sync, 'get').and.callFake(function(key, callback) {
//             callback();
//         });
//     });
//
//     it("should save 0 when off", function () {
//         status.off();
//
//         spyOn(window.sessionStorage, 'setItem')
//         chrome.storage.sync.get("status", function (res) {
//             expect(res.status).toBe(0);
//         });
//     });
//
// });
