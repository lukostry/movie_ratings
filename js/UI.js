/*Module for creating UI messages*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.UI");

MOVIE_RATING_APP.UI = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        effects = MOVIE_RATING_APP.effects;

    var successTemplate = config.HANDLEBARS_success,
        successContext = config.CONTEXT_success;

    var showAndHideSuccessMsg = function(el) {
        var successMsg = successTemplate(successContext);
        $(successMsg).insertAfter(el);
        effects.fadeAndRemove(el.next()); //the DOM node which contains the success message will always be the immediately following sibling of the wrapper
    };
    //public API
    return {
        success: showAndHideSuccessMsg
    }
}());
