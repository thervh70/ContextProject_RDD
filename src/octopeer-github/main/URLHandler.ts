/**
 * Created by Maarten on 24-05-2016.
 *
 * This utility class handles URL formatting and parsing.
 */
class URLHandler {

    /**
     * Appends a trailing slash to the URL if there is no trailing slash yet.
     * @param url           The URL to format.
     * @returns {string}    A formatted URL.
     */
    public static formatUrl(url: string) {
        if (url.charAt(url.length - 1) !== "/") {
            url += "/";
        }
        return url;
    }

    /**
     * Gets the session ID from the URL.
     * @param url           The URL to get the session ID from.
     * @returns {Number}    The session ID.
     */
    public static getSessionFromUrl(url: string) {
        let suburl = url.substr(0, url.length - 1);             // trim trailing slash
        suburl = suburl.substr(suburl.lastIndexOf("/") + 1);    // substring starting from the character after the last "/"
        return Number(suburl);
    }

    /**
     * Checks whether the url provided is one that belongs to a Pull Request.
     * 'Correct' format:  http[s]//[...]github.com/(owner)/(repo)/pull/(pr-no)[/...]
     * @param url               The URL to get the session ID from.
     * @returns {Array<string>} [] if the url is INVALID. If the url is VALID: [
     *      0: the url recognized by the regular expression
     *      1: owner of the repo
     *      2: repository name
     *      3: pull request number (in a string)
     * ]
     */
    public static isPullRequestUrl(url: string): Array<string> {
        const urlFormat = /https?:\/\/.*github\.com\/(.+)\/(.+)\/pull\/([^\/#\?]+)[\/#\?]?.*/;
        if (urlFormat.test(url)) {
            const res: RegExpExecArray = urlFormat.exec(url);
            return [res[0], res[1], res[2], res[3]];
        } else {
            return [];
        }
    }

}
