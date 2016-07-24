
/*Config module*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.config");

MOVIE_RATING_APP.config = {
    URL_BASE: "https://movie-ranking.herokuapp.com/movies/",

    MSG_LOADING: "",

    //selected DOM nodes
    DOM_listing: ".movie_listing",
    DOM_container: ".container",
    DOM_distribution_wrapper: ".distribution",
    DOM_app: ".movie_rating_app",
    DOM_movie_titles: ".titles",
    DOM_movie_items: ".movie",
    DOM_star_buttons: ".buttons_container",
    DOM_avg: ".avg_number",
    DOM_rating_panel_wrapper: ".rating_panel_wrapper",
    DOM_progress_bar: ".progress_bell",
    DOM_dist_placeholder: ".rating_percentage_number",

    //Parameters to be passed to Ajax requests
    AJAX_init: {
        type: "GET",
        dataType: "json",
        url: "https://movie-ranking.herokuapp.com/movies",
        timeout: 4000
    },
    AJAX_fetch_ratings: {
        type: "GET",
        dataType: "json",
        url: "https://movie-ranking.herokuapp.com/movies",
        timeout: 2000,
        urlExtender: "/ratings"
    },

    //Handlebars templates
    HANDLEBARS_LISTING: function(context) {
        return Handlebars.templates.listing(context);
    },
    HANDLEBARS_rating_panel: function(context) {
        return Handlebars.templates.ratingPanel(context);
    },
    HANDLEBARS_table: function(context) {
        return Handlebars.templates.ratingTable(context);
    },
    //Handlebars context objects
    CONTEXT_stars_count: {
        stars: [1, 2, 3, 4, 5]
    },
    CONTEXT_stars: {
        stars: ["1 star", "2 star", "3 star", "4 star", "5 star"]
    }
};
