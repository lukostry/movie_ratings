/*Module for inserting content*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.insertContent");

MOVIE_RATING_APP.insertContent = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        effects = MOVIE_RATING_APP.effects,
        calc = MOVIE_RATING_APP.calcRatings,
        listeners = MOVIE_RATING_APP.setUpListeners,
        rating = MOVIE_RATING_APP.rateMovies;
    //`private variables`
    var listing = $(config.DOM_listing),
        distributionWrapper = config.DOM_distribution_wrapper,
        averagePlaceholder = config.DOM_avg,
        ratingPanel = config.DOM_rating_panel_wrapper,
        progressBar = config.DOM_progress_bar,
        distPlaceholders = config.DOM_dist_placeholder,
        movieListingTemplate = config.HANDLEBARS_LISTING,
        tableTemplate = config.HANDLEBARS_table,
        ratingTemplate = config.HANDLEBARS_rating_panel,
        contextStarsCount = config.CONTEXT_stars_count,
        contextStars = config.CONTEXT_stars;

    var showMovies = function(movies) {
        listing.append(movieListingTemplate(movies));
    };

    var createRatingPanel = function(movie) {
        $(movie).append(ratingTemplate(contextStarsCount));
    };

    var createDistributionTable = function(el) {
        el.find($(distributionWrapper)).append(tableTemplate(contextStars));
    };

    var displayRatingPanel = function(el, avg) {
        el.find($(averagePlaceholder)).text(avg);
        el.find($(ratingPanel))
            .not(":animated")
            .slideToggle();
    };

    var displayDistribution = function(el, array) {
        var rows = el.find($(progressBar));
        var distNumbers = el.find($(distPlaceholders));

        rows.each(function(index, val) {
            // console.log(typeof array[index]);
            effects.animateProgressBar(val, array[index]);
        });

        distNumbers.each(function(index, val){
            $(val).text(array[index]);
        });
    };

    var firstFetching = function(currentEl) {
        //first the data will be fetched, the whole rating panel for each movie need to be creared
        currentEl.attr("data-fetched", true);
        createRatingPanel(currentEl);
        listeners.mouseOnStars(effects.addHoverClass, effects.removeHoverClass);
        listeners.clickOnRatingButton(currentEl, rating.rateMovie);
        createDistributionTable(currentEl);
        //shared methods
        displayRatingPanel(currentEl, calc.getMean());
        displayDistribution(currentEl, calc.getDistArray());
    };

    var furtherFetchings = function(currentEl) {
        displayRatingPanel(currentEl, calc.getMean());
        displayDistribution(currentEl, calc.getDistArray());
    };

    //return a public API
    return {
        showMovies: showMovies,
        firstFetching: firstFetching,
        furtherFetchings: furtherFetchings
    };
}());
