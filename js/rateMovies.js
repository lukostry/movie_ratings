/*Module for rating movies*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.rateMovies");

MOVIE_RATING_APP.rateMovies = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        util = MOVIE_RATING_APP.utilities,
        UI = MOVIE_RATING_APP.UI;

    var rateMovie = function(el) {
        //select element for which success/error messages will be displayed
        var wrapper = $(el).parent().prev($(config.DOM_distribution_wrapper));

        //modify URL & set the data property before sending requests
        config.AJAX_rate_movie.url = config.AJAX_fetch_ratings.url;
        config.AJAX_rate_movie.data = {
            "rating": $(el).data("rating")
        };
        util.server(config.AJAX_rate_movie)
            .done(function callback(data, textStatus, jqXHR) {
                //select and remove the button's container
                var buttonsContainer = $(el).parent();
                buttonsContainer.remove();
                
                UI.success(wrapper);
            });
    };

    //public API
    return {
        rateMovie: rateMovie
    };
}());
