/**
 * JQuery storage extends default storage API to resolve cross-browser issues
 * @author       Sachin Singh
 * @dependencies jQuery 1.11+
 * @date         26/05/2018
 */

(function ($) {
    if (!$) {
        window.common = window.$ = $ = {};
    };
    if (!$.storage) {
        $.storage = {

        };
    }
})(
    window.jQuery
);