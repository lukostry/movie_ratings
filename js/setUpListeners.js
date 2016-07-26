/*Module for setting up event listeners*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.setUpListeners");

MOVIE_RATING_APP.setUpListeners = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config;

    var clickToSort = function(callback) {
        var movieTitles = $(config.DOM_movie_titles);

        movieTitles.on("click", function(event) {
            callback();
        });
    };

    var clickOnMovie = function(callback) {
        var allMovies = $(config.DOM_movie_items);

        allMovies.on("click", function(event) {
            var currentEl = $(this);

            event.stopImmediatePropagation();
            // eventHandlers.handleClickOnMovie(event, currentEl);
            // handleAjax.fetchRatings(currentEl);
            callback(currentEl);
        });
    };

    var mouseOnStars = function(callback1, callback2) {
        var starIcons = $(config.DOM_star_buttons_container);

        starIcons.on("mouseenter", "button", function(event) {
            // effects.addHoverClass($(this));
            // eventHandlers.handleMouseOnStar();
            callback1($(this));
        });
        starIcons.on("mouseleave", "button", function(event) {
            // effects.removeHoverClass($(this));
            // eventHandlers.handleMouseOutOfStar();
            callback2($(this));
        });
    };

    var clickOnRatingButton = function(parentEl, callback) {
        var buttonsToRate = $(parentEl).find(config.DOM_star_buttons);

        buttonsToRate.on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            callback(this);
        });
    };

    //public API
    return {
        clickOnMovie: clickOnMovie,
        clickToSort: clickToSort,
        mouseOnStars: mouseOnStars,
        clickOnRatingButton: clickOnRatingButton
    };
}());
