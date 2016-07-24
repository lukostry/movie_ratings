var MOVIE_RATING_APP = MOVIE_RATING_APP || {};

//Add the `namespace` method which will enable safer creation of modules

MOVIE_RATING_APP.namespace = function(nsString) {
    //variable `parts` will store dot separated values in an array
    var parts = nsString.split("."),
        parentEl = MOVIE_RATING_APP,
        i;

    //strip redundant leading global
    if (parts[0] === "MOVIE_RATING_APP") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        //create a property if it doesn't existing
        if (typeof parentEl[parts[i]] === "undefined") {
            parentEl[parts[i]] = {};
        }
        //New defined property will become new parent element itself
        parentEl = parentEl[parts[i]];
    }
    return parentEl;
};
