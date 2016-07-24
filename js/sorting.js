/*Module for sorting movies*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.sorting");

MOVIE_RATING_APP.sorting = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config;

    var rowSorting = function() {
        var rows = $(config.DOM_movie_items).toArray();

        rows.sort(function (a, b) {
            // select text nodes for each movie
            a = $(a).find("h3").text();
            b = $(b).find("h3").text();
            //perform sort based on text nodes
            if (a < b) {
                return -1;
            } else {
                return a > b ? 1 : 0;
            }
        });

        return rows;
    };

    var firstSort = function() {
        var movieListing = $(config.DOM_listing),
            movieTitles = $(config.DOM_movie_titles);

        movieTitles.addClass("ascending");
        $(".fa-caret-up").show();

        movieListing.append(rowSorting());
    };

    var furtherSorts = function() {
        var movieListing = $(config.DOM_listing),
            movieTitles = $(config.DOM_movie_titles),
            rows = $(config.DOM_movie_items).toArray();

        movieTitles.toggleClass("ascending descending");
        $(".fa-caret-up").toggle();
        $(".fa-caret-down").toggle();
        movieListing.append(rows.reverse());
    };

    var sortMovies = function() {
        var movieTitles = $(config.DOM_movie_titles);

        if (!(movieTitles.hasClass("ascending") || movieTitles.hasClass("descending"))) {
            firstSort();
        } else {
            furtherSorts();
        }
    };

    //public API
    return {
        sortMovies: sortMovies
    };
}());
