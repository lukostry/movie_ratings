//Declare a global namespace

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

/*Config module*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.config");

MOVIE_RATING_APP.config = {
    URL_BASE: "https://movie-ranking.herokuapp.com/movies",

    MSG_LOADING: "",

    //selected DOM nodes
    DOM_listing: ".movie_listing",
    DOM_container: ".container",
    DOM_app: ".movie_rating_app",
    DOM_movie_titles: ".titles",
    DOM_movie_items: ".movie",

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
        timeout: 4000
    },

    //Handlebars templates
    HANDLEBARS_LISTING: function(context) {
        return Handlebars.templates.listing(context);
    }
};

/*Module for inserting content*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.eventHandlers");

MOVIE_RATING_APP.eventHandlers = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config;

    var handleSort = function(sortFunc) {
        var movieTitles = $(config.DOM_movie_titles);

        movieTitles.on("click", sortFunc);
    };

    //public API
    return {
        handleSort: handleSort
    };
}());

/* Utility module which contains feature to handle Ajax requests*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.utilities");

MOVIE_RATING_APP.utilities = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config;

    var server = function(conf) {
        return $.ajax({
            type: conf.type,
            url: conf.url,
            timeout: conf.timeout,
            dataType: conf.dataType,
            data: conf.data
        });
    };

    //public API
    return {
        server: server
    };
}());

/*Module for inserting content*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.insertContent");

MOVIE_RATING_APP.insertContent = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config;

    var listing = $(config.DOM_listing),
        movieListingTemplate = config.HANDLEBARS_LISTING;

    function showMovies(movies) {
        listing.append(movieListingTemplate(movies));
    }
    //return a public API
    return {
        showMovies: showMovies
    };
}());

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

/*Module for fetching movie ratings*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.fetchRatings");

MOVIE_RATING_APP.fetchRatings = (function() {
    //declaring dependecies
    var config = MOVIE_RATING_APP.config;
}());

/*Module for loading movies*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.loadMovies");

MOVIE_RATING_APP.loadMovies = (function() {

    //declaring dependecies
    var config = MOVIE_RATING_APP.config,
        insertContent = MOVIE_RATING_APP.insertContent,
        util = MOVIE_RATING_APP.utilities,
        handlers = MOVIE_RATING_APP.eventHandlers,
        sorting = MOVIE_RATING_APP.sorting;

    var init = function() {
        util.server(config.AJAX_init)
            // .then(function() {console.log("Add UI - loading");})
            .done(function callback(data, textStatus, jqXHR) {
                insertContent.showMovies(data);
            })
            .done(function callback() {
                handlers.handleSort(sorting.sortMovies)
            })
            .done(function callback() {

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

//Probably need to be removed!!!!!!!

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.initialization");

MOVIE_RATING_APP.initialization = (function() {
    //declaring dependecies
    var init;
}());

$(document).ready(MOVIE_RATING_APP.loadMovies);

//!!! BREAK HERE !!!
/*
$(document).ready(function () {


    function insertContent(movies) {
        //declaring dependecies
        var config = MOVIE_RATING_APP.config;

        var listing = $(config.DOM_listing),
            // movieListingTemplate = Handlebars.templates.listing(movies);
            movieListingTemplate = config.HANDLEBARS_LISTING(movies);

        listing.append(movieListingTemplate);
    }

    function loadMovies() {
        var url = "https://movie-ranking.herokuapp.com/movies";
        var container = $(".container");
        var app = $(".movie_rating_app");

        $.ajax({
            type: "GET",                                           // Wybór metody: GET lub POST.
            url: url,
            // dataType: "text/plain",

            timeout: 4000,                                          // Czas oczekiwania.
            beforeSend: function() {                                // Przed wykonaniem żądania Ajax.
                container.append('<div id="load" class="">Wczytywanie</div>');  // Wczytanie komunikatu.
            },
            complete: function() {                                  // Po wykonaniu żądania Ajax.
                $('#load').remove();                                // Usunięcie komunikatu.
            },
            success: function(data) {
                insertContent(data);
                showRatings();
                sortMovies();
            },
            error: function() {                                      // Wyświetlenie komunikatu o błędzie.
                var context = {
                    class: "error",
                    icon: "fa fa-times-circle-o"
                };
                var error = Handlebars.templates.error(context);

                app.append(error);
            }
        });
    }
    loadMovies();

    function fetchRatings(data, currentElement) {
        var oneStar = [];
        var twoStars = [];
        var threeStars = [];
        var fourStars = [];
        var fiveStars = [];

        var countOneStar, countTwoStars, countThreeStars, countFourStars, countFiveStars, ratings;

        data.forEach(function(movie) {
            if (movie.rating === 1) {
                oneStar.push(movie.rating);
            } else if (movie.rating === 2) {
                twoStars.push(movie.rating);
            } else if (movie.rating === 3) {
                threeStars.push(movie.rating);
            } else if (movie.rating === 4) {
                fourStars.push(movie.rating);
            } else if (movie.rating === 5) {
                fiveStars.push(movie.rating);
            }

        });
        ratings = [];
        countOneStar = oneStar.length;
        ratings.push(countOneStar);
        countTwoStars = twoStars.length;
        ratings.push(countTwoStars);
        countThreeStars = threeStars.length;
        ratings.push(countThreeStars);
        countFourStars = fourStars.length;
        ratings.push(countFourStars);
        countFiveStars = fiveStars.length;
        ratings.push(countFiveStars);

        mean = calculateMean(ratings);
        console.log(mean);

        paramsToDisplay = {
            avg: mean,
            distribution: ratings,
            calculatePercentage: function(star, ratings) {
    			var sum = 0;
    			for (var i=0, maxLength = ratings.length; i < maxLength; i++) {
    				sum += ratings[i];
    			}
    			return ((Math.round((ratings[star]/sum)*100))+"%");
    		}
        };
    }


    function showRatings() {
        var allMovies = $(".movie");
        var app = $(".movie_rating_app");

        allMovies.on("click", function(e) {
            e.stopImmediatePropagation();
            var url = "https://movie-ranking.herokuapp.com/movies/" + $(this).data("id") + "/ratings";
            var currentElement = this;
            var mean;

            $.ajax({
                type: "GET",                                           // Wybór metody: GET lub POST.
                url: url,                                              // Ścieżka dostępu do pliku.
                timeout: 2000,                                         // Czas oczekiwania.
                success: function(data) {
                    var paramsToDisplay;
                    fetchRatings(data, $(currentElement));
                },
                error: function() {                                      // Wyświetlenie komunikatu o błędzie.
                    var context = {
                        class: "error",
                        icon: "fa fa-times-circle-o"
                    };
                    var error = Handlebars.templates.error(context);

                    app.append(error);
                },
                complete: function() {
                    if ($(currentElement).data("fetched")) {

                        displayRatingPanel(currentElement, paramsToDisplay);
                        animateRatings($(currentElement).find("table"), paramsToDisplay);

                        rateMovie(url, currentElement);
                    } else {
                        $(currentElement).attr("data-fetched", true);
                        createRatingPanel(currentElement);
                        createTable($(currentElement).find(".distribution"));

                        displayRatingPanel(currentElement, paramsToDisplay);
                        animateRatings(($(currentElement).find("table")), paramsToDisplay);

                        rateMovie(url, currentElement);
                    }
                }
            });
        });
    }


    function calculateMean(array) {
        var sum = 0;
        var counter = 0;
        for (var i = 0, maxLength = array.length; i < maxLength; i++) {
            sum += (array[i] * (i+1));
            counter += array[i];
        }
        return (sum/counter).toFixed(2);
    }

    function createRatingPanel(movie) {
        var context = {
            stars: [1, 2, 3, 4, 5]
        };
        var wrapper = Handlebars.templates.ratingPanel(context);

        $(movie).append(wrapper);

        $(".buttons_container").on("mouseenter", "button", function(){
            $(this).find("i").addClass("hovered");
            $(this).prevAll().find("i").addClass("hovered");
        });

        $(".buttons_container").on("mouseleave", "button", function(){
            $(this).find("i").removeClass("hovered");
            $(this).prevAll().find("i").removeClass("hovered");
        });
    }

    function displayRatingPanel(currentElement, displayParameters) {
        $(currentElement).find($(".avg_number")).text(displayParameters.avg);
        $(currentElement)
            .find($(".rating_panel_wrapper"))
            .not(":animated")
            .slideToggle();
    }

    function rateMovie(url, parentEl) {
        var buttonsToRate = $(parentEl).find(".button_to_rate");

        var buttonsContainer = $(parentEl).find(".buttons_container");
        console.log(buttonsContainer);

        var distributionWrapper = $(parentEl).find(".distribution");

        buttonsToRate.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var userRating = $(this).data("rating");
            // var wrapper = $(".rating_panel_wrapper");

            var newRating = {
                "rating": userRating
            };

            $.ajax({
                type: "POST",                                           // Wybór metody: GET lub POST.
                url: url,
                data: newRating,
                dataType: "json",                                       // Ścieżka dostępu do pliku.
                timeout: 2000,                                          // Czas oczekiwania.
                success: function() {
                    $(parentEl).attr("data-voted", true);
                    buttonsContainer.remove();

                    var context = {
                        class: "success",
                        icon: "fa fa-check-circle-o"
                    };
                    var success = Handlebars.templates.success(context);

                    $(success).insertAfter(distributionWrapper).fadeIn(700).delay(1700).fadeOut(600, function(){
                        $(success).remove();
                    });

                },
                error: function() {                                      // Wyświetlenie komunikatu o błędzie.

                    var error = $("<div>", {class: "error"});
                    var message = $("<p>").text(" Oops, something went wrong, please try to refresh the page and vote again");
                    var xFont = $("<i>", {class: "fa fa-times-circle-o"}).attr("aria-hidden", true);

                    message.prepend(xFont);
                    error.append(message);

                    error.insertAfter(distributionWrapper).fadeIn(700).delay(1700).fadeOut(600, function(){
                        error.remove();
                    });
                }
            });
        });
    }

    function sortMovies() {
        // var table = $("table");
        var movieListing = $(".movie_listing");
        var rows = $(".movie").toArray();
        var movieTitles = $(".titles");

        movieTitles.on("click", function(){
            console.log("works");
            if (movieTitles.hasClass("ascending") || movieTitles.hasClass("descending")) {
                movieTitles.toggleClass("ascending descending");
                $(".fa-caret-up").toggle();
                $(".fa-caret-down").toggle();
                movieListing.append(rows.reverse());
            } else {
                movieTitles.addClass("ascending");
                $(".fa-caret-up").show();
                rows.sort(function (a, b) {
                    a = $(a).find("h3").text();
                    b = $(b).find("h3").text();

                    if (a < b) {
                        return -1;
                    } else {
                        return a > b ? 1 : 0;
                    }
                });
                movieListing.append(rows);
            }
        });
    }

    function createTable(container) {
        var context = {
            stars: ["1 star", "2 star", "3 star", "4 star", "5 star"]
        };
        var table = Handlebars.templates.ratingTable(context);

	   $(container).append(table);
    }

    function animateRatings(table, object) {


        var row = $(table).find(".progress_bell");
		var percentageNumber = $(table).find(".rating_percentage_number");

		row.each(function(index, el) {
			$(el).animate ({
				width: paramsToDisplay.calculatePercentage(index, object.distribution)
			}, 1000);
		});

		percentageNumber.each(function(index, el) {
			$(el).text(paramsToDisplay.calculatePercentage(index, object.distribution));
		});
    }

});
*/
