/// <reference path="../../../typings/main.d.ts"/>
/// <reference path="../content/Types/ElementID.ts"/>
/// <reference path="../content/Types/EventID.ts"/>
/// <reference path="../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../content/ElementEventBinding/ElementEventBinding.ts"/>

interface Array<T> {
    equals(other: Array<T>): boolean;
}

Array.prototype.equals = function(array: Array<any>) {
    return this.length === array.length &&
        this.every( function(this_i: any, i: any) {
            return this_i === array[i];
        });
};
