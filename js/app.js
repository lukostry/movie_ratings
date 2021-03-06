$(document).ready(function () {
    MOVIE_RATING_APP.handleInitRequest();
});

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
