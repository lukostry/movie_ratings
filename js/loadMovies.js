
/*Module for loading movies*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.loadMovies");

MOVIE_RATING_APP.loadMovies = (function() {

    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        insertContent = MOVIE_RATING_APP.insertContent,
        util = MOVIE_RATING_APP.utilities,
        handlers = MOVIE_RATING_APP.eventHandlers,
        listeners = MOVIE_RATING_APP.setUpListeners,
        sorting = MOVIE_RATING_APP.sorting,
        handleAjax = MOVIE_RATING_APP.handleAjaxRequests;

    var init = function() {
        util.server(config.AJAX_init)
            // .then(function() {console.log("Add UI - loading");})
            .done(function callback(data, textStatus, jqXHR) {
                insertContent.showMovies(data);
            })
            .done(function callback() {
                listeners.clickToSort(sorting.sortMovies);
            })
            .done(function callback() {
                listeners.clickOnMovie(handleAjax.fetchRatings);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log("Add UI - fail");
                console.log(errorThrown);
            })
            .always(function() {console.log("Remove UI - loading");});
    };

    //public API
    return init;
}());
