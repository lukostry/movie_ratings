/*Module for various visual effects*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.effects");

MOVIE_RATING_APP.effects = (function() {
    //declaring dependecies

    var addHoverClass = function(el) {
        $(el).find("i").addClass("hovered");
        $(el).prevAll().find("i").addClass("hovered");
    };

    var removeHoverClass = function(el) {
        $(el).find("i").removeClass("hovered");
        $(el).prevAll().find("i").removeClass("hovered");
    };

    var animateProgressBar = function(el, percentage) {
        $(el).animate({
            width: percentage
        }, 1000);
    };

    //public API
    return {
        addHoverClass: addHoverClass,
        removeHoverClass: removeHoverClass,
        animateProgressBar: animateProgressBar
    };
}());
