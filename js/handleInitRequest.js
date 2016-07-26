
/*Module for loading movies*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.handleInitRequest");

MOVIE_RATING_APP.handleInitRequest = (function() {

    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        insertContent = MOVIE_RATING_APP.insertContent,
        util = MOVIE_RATING_APP.utilities,
        handlers = MOVIE_RATING_APP.eventHandlers,
        listeners = MOVIE_RATING_APP.setUpListeners,
        sorting = MOVIE_RATING_APP.sorting,
        getRating = MOVIE_RATING_APP.getRatingRequests,
        UI = MOVIE_RATING_APP.UI;
    //choose DOM node for which the error message will be appended
    var app = $(config.DOM_app);

    var init = function() {
        util.server(config.AJAX_init)
            // .then(function() {console.log("Add UI - loading");}) - add loading img/gif
            .done(function callback(data, textStatus, jqXHR) {
                insertContent.showMovies(data);
            })
            .done(function callback() {
                listeners.clickToSort(sorting.sortMovies);
            })
            .done(function callback() {
                listeners.clickOnMovie(getRating.fetchRatings);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                UI.error(app);
                console.log(errorThrown);
            })
            .always(function() {console.log("Remove UI - loading");});
    };

    //public API
    return init;
}());
