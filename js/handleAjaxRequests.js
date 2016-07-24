/*Module for fetching movie ratings*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.handleAjaxRequests");

MOVIE_RATING_APP.handleAjaxRequests = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        util = MOVIE_RATING_APP.utilities,
        insert = MOVIE_RATING_APP.insertContent,
        calc = MOVIE_RATING_APP.calcRatings,
        listeners = MOVIE_RATING_APP.setUpListeners;

    var configureURL = function(id) {
        config.AJAX_fetch_ratings.url = config.URL_BASE;
        config.AJAX_fetch_ratings.url += id + config.AJAX_fetch_ratings.urlExtender;
    };

    var fetchRatings = function(currentEl) {
        //trigger the function which will create valid url for a clicked movie
        configureURL(currentEl.data("id"));
        util.server(config.AJAX_fetch_ratings)
            .done(function callback(data, textStatus, jqXHR) {
                calc.calcParamsToDisplay(data);

                if (!(currentEl.data("fetched"))) {
                    insert.firstFetching(currentEl);
                } else {
                    insert.furtherFetchings(currentEl);
                }
                //call a function which will show the fetched rankings
            })
            .done(function callback() {
                // listeners.mouseOnStars();
            });
    };

    //public API
    return {
        fetchRatings: fetchRatings
    };
}());
