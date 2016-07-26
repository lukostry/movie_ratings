/*Module for creating and displaying UI messages*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.UI");

MOVIE_RATING_APP.UI = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        effects = MOVIE_RATING_APP.effects;

    var app = $(config.DOM_app),
        successTemplate = config.HANDLEBARS_success,
        successContext = config.CONTEXT_success,
        errorTemplate = config.HANDLEBARS_error,
        errorContext = config.CONTEXT_error;

    var showAndHideSuccessMsg = function(el) {
        var successMsg = successTemplate(successContext);
        $(successMsg).insertAfter(el);
        effects.fadeAndRemove(el.next()); //the DOM node which contains the success message will always be the immediately following sibling of the wrapper
    };

    var showErrorMsg = function(el) {
        el.append(errorTemplate(errorContext));
    }

    //public API
    return {
        success: showAndHideSuccessMsg,
        error: showErrorMsg
    }
}());
