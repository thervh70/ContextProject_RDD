/**
 * Created by Mathias on 2016-06-16.
 */
/**
 * Provide additional functions to help the addDomEvent overrides.
 */
class AuxiliaryAddDOMEventFunctions {

    /**
     * Check whether a rectangle is in scope.
     * @param width the width of the scope
     * @param height the height of the scope
     * @param rectangle the rectangle to be checked
     * @returns {boolean} true when both in horizontal and vertical scope, else false
     */
    public static isInScope(width: number, height: number, rectangle: ClientRect) {
        return this.isInHorizontalScope(width, rectangle) && this.isInVerticalScope(height, rectangle);
    };

    /**
     * Determine whether a given number is in between two other numbers (same number is also inBetween)
     * @param leftBound the left bound
     * @param rightBound the right bound
     * @param value the number to be checked
     * @returns {boolean} true if given value in between (or same as) given bounds, else false
     */
    private static isBetween(leftBound: number, rightBound: number, value: number) {
        return leftBound <= value && rightBound >= value;
    };

    /**
     * Check whether a rectangle is between two values, horizontally.
     * @param width the width between the two values
     * @param rect the rectangle to be checked
     * @returns {boolean} true when in horizontal scope, else false
     */
    private static isInHorizontalScope(width: number, rect: ClientRect) {
        return this.isBetween(0, width, rect.left) || this.isBetween(0, width, rect.right);
    };

    /**
     * Check whether a rectangle is between two values, vertically.
     * @param height the height between the two values
     * @param rect the rectangle to be checked
     * @returns {boolean} true when in vertical scope, else false
     */
    private static isInVerticalScope(height: number, rect: ClientRect) {
        return this.isBetween(0, height, rect.top) || this.isBetween(0, height, rect.bottom);
    };
}
