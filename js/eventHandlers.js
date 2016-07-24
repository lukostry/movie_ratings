/*Module for event handlers*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.eventHandlers");

MOVIE_RATING_APP.eventHandlers = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        handleAjax = MOVIE_RATING_APP.handleAjaxRequests,
        effects = MOVIE_RATING_APP.effects;

    var handleClickOnMovie = function(event, currentEl) {

        event.stopImmediatePropagation();

        handleAjax.fetchRatings(currentEl);
    };

    var handleMouseOnStar = function() {
        effects.addHoverClass($(this));
    };

    var handleMouseOutOfStar = function() {
        effects.removeHoverClass($(this));
    };

    //public API
    return {
        handleClickOnMovie: handleClickOnMovie,
        handleMouseOnStar: handleMouseOnStar,
        handleMouseOutOfStar: handleMouseOutOfStar;
    };
}());
