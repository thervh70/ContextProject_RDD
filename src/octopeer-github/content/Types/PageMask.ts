/**
 * Created by Maarten on 30-05-2016
 *
 * Class for handling PageMasks.
 * PageMasks indicate which elements are on which pages.
 */
// tslint:disable:no-bitwise
class PageMask {

    /** This PaseMask indicates that an element is located on the Conversation page. */
    public static get CONVERSATION()    { return new PageMask(0b001); };
    /** This PaseMask indicates that an element is located on the Commits page. */
    public static get COMMITS()         { return new PageMask(0b010); };
    /** This PaseMask indicates that an element is located on the Files Changed page. */
    public static get FILES_CHANGED()   { return new PageMask(0b100); };
    /** This PaseMask indicates that an element is located on all pages. */
    public static get ALL()             { return new PageMask(0b111); };

    /**
     * Combines multiple PageMasks into one. This can be used to indicate that an element can be found at multiple pages.
     * @param masks vargars list of PageMasks to combine.
     * @returns {PageMask} One PageMask which represents the combination of all PageMasks in `masks`.
     */
    public static combine(...masks: PageMask[]) {
        let res = 0;
        for (let mask of masks) {
            res |= mask._mask;
        }
        return new PageMask(res);
    }

    /**
     * Constructs a new PageMask. Should NOT be used externally.
     * @param _mask bitmask for PageMask.
     */
    constructor(private _mask: number) { }

    /**
     * Checks whether this can be found on the page represented by `pageMask`
     * @param pageMask pageMask to check for.
     * @returns {boolean} true if this can be found on the page represented by `pageMask`, false otherwise.
     */
    public isOnPage(pageMask: PageMask): boolean {
        return (this._mask & pageMask._mask) > 0;
    }

}
// tslint:enable:no-bitwise
