/*Module for various visual effects*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.effects");

MOVIE_RATING_APP.effects = (function() {

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

    var fadeAndRemove = function(el) {
        $(el).fadeIn(700).delay(1700).fadeOut(600, function() {
            $(el).remove();
        });
    };

    //public API
    return {
        addHoverClass: addHoverClass,
        removeHoverClass: removeHoverClass,
        animateProgressBar: animateProgressBar,
        fadeAndRemove: fadeAndRemove
    };
}());
