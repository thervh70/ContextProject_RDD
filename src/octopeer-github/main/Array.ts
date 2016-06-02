/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * This interface makes sure that the current Array type in JavaScript can be extended.
 * It is extended by defining an equals function for two arrays.
 */
interface Array<T> {
    equals(that: Array<T>): boolean;
    contains(contains: any): boolean;
}

/**
 * Checks whether two arrays are equal (shallow check).
 * @param that the array to compare with.
 * @returns {boolean} Whether the two arrays are equal.
 */
Array.prototype.equals = function(that: Array<any>) {
    return that !== null &&
        that !== undefined &&
        this.length === that.length &&
        this.every(function(this_i: any, i: any) {
            return this_i === that[i];
        });
};

/**
 * Checks whether this Array contains `element`
 * @param element the element to check for
 * @returns {boolean} true if `this` contains `element`, false otherwise.
 */
Array.prototype.contains = function(element: any) {
    for (let e of this) {
        if (e.equals !== undefined && e.equals(element) || e === element) {
            return true;
        }
    }
    return false;
};
