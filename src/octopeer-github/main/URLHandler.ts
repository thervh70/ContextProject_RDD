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

}
