/**
 * Created by Mitchell on 27-5-2016.
 * Mocks chrome modules, functions and properties.
 * Because of this mock, test cases can be performed on chrome dependent items (e.g. the storage).
 */

let _window: any = window;

/* tslint:disable-next-line:no-empty */
const emptyFun = function() {};

_window.chrome = {
    browserAction: {
        setIcon: emptyFun,
    },
    runtime: {
        onMessage: {
            addListener: emptyFun,
            hasListeners: emptyFun,
        },
        sendMessage: emptyFun,
    },
    storage: {
        local: {
            get: emptyFun,
            set: emptyFun,
        },
        onChanged: {
            addListener: emptyFun,
        },
        sync: {
            get: emptyFun,
            set: emptyFun,
        },
    },
    tabs: {
        onActivated: {
            addListener: emptyFun,
        },
        onUpdated: {
            addListener: emptyFun,
        },
        query: emptyFun,
    },
};
