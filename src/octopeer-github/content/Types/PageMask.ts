/**
 * Created by Maarten on 30-05-2016
 *
 * Class for handling PageMasks.
 * PageMasks indicate which elements are on which pages.
 */
// tslint:disable:no-bitwise
class PageMask {

    public static get CONVERSATION()    { return new PageMask(0b001); };
    public static get COMMITS()         { return new PageMask(0b010); };
    public static get FILES_CHANGED()   { return new PageMask(0b100); };

    constructor(private _mask: number) { }

    public isOnPage(pageMask: PageMask): boolean {
        return (this._mask ^ pageMask._mask) > 0;
    }

}
// tslint:enable:no-bitwise
