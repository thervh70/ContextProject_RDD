/**
 * Created by Mitchell on 27-5-2016.
 * Mocks chrome modules, functions and properties.
 * Because of this mock, test cases can be performed on chrome dependent items (e.g. the storage).
 */

let _window: any = window;

/* tslint:disable:no-empty */
_window.chrome = {
    browserAction: {
        setIcon: function() {},
    },
    runtime: {
        onMessage: {
            addListener: function() {},
            hasListeners: function() {},
        },
        sendMessage: function() {},
    },
    storage: {
        local: {
            get: function () {},
            set: function () {},
        },
        onChanged: {
            addListener: function () {},
        },
        sync: {
            get: function () {},
            set: function () {},
        },
    },
    tabs: {
        onActivated: {
            addListener: function() {},
        },
        onUpdated: {
            addListener: function() {},
        },
        query: function() {},
    },
};
/* tslint:enable:no-empty */
