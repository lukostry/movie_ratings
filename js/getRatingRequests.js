/*Module for fetching movie ratings*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.getRatingRequests");

MOVIE_RATING_APP.getRatingRequests = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        util = MOVIE_RATING_APP.utilities,
        insert = MOVIE_RATING_APP.insertContent,
        calc = MOVIE_RATING_APP.calcRatings;

    var configureURL = function(id) {
        config.AJAX_fetch_ratings.url = config.URL_BASE;
        config.AJAX_fetch_ratings.url += id + config.AJAX_fetch_ratings.urlExtender;
    };

    var fetchRatings = function(currentEl) {
        //trigger the function which will create valid url for a clicked movie
        configureURL(currentEl.data("id"));
        //send Ajax request with the proper URL
        util.server(config.AJAX_fetch_ratings)
            .done(function callback(data, textStatus, jqXHR) {
                calc.calcParamsToDisplay(data);

                if (!(currentEl.data("fetched"))) {
                    insert.firstFetching(currentEl);
                } else {
                    insert.furtherFetchings(currentEl);
                }
            });
    };

    //public API
    return {
        fetchRatings: fetchRatings
    };
}());
