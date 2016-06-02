$(document).ready(function () {

    function insertContent(movies) {
        var listing = $(".movie_listing");
        $.each(movies, function(index, movie) {
            var li = $("<li>", {class: "movie"});
            li.attr("data-id", movie.id);
            var title = $("<h3>").text(movie.title);
            var posterContainer = $("<div>", {class: "poster_wrapper"});
            var moviePoster = $("<img>").attr("src", movie.poster);

            posterContainer.append(moviePoster);

            li.append(title);
            li.append(posterContainer);

            listing.append(li);
        });
    }

    function loadMovies() {
        var url = "https://movie-ranking.herokuapp.com/movies";
        var container = $(".container");

        $.ajax({
            type: "GET",                                           // Wybór metody: GET lub POST.
            url: url,
            // dataType: "text/plain",
                                               // Ścieżka dostępu do pliku.
            timeout: 4000,                                          // Czas oczekiwania.
            beforeSend: function() {                                // Przed wykonaniem żądania Ajax.
                container.append('<div id="load>Wczytywanie</div>');  // Wczytanie komunikatu.
            },
            complete: function() {                                  // Po wykonaniu żądania Ajax.
                $('#load').remove();                             // Usunięcie komunikatu.
            },
            success: function(data) {
                insertContent(data);
                showRatings();
                sortMovies();
                /*var result1 = [];
                result1 = data.filter(countOneStar);
                console.log(result1.length);                               // Wyświetlenie zawartości.
                console.log(result1);
                console.log(data[0]);*/
        // content.html( $(data).find('#container') ).hide().fadeIn(400);
            },
            error: function() {                                      // Wyświetlenie komunikatu o błędzie.
                container.html('<div class="loading">Proszę spróbować wkrótce.</div>');
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
    			for (var i=0; i < ratings.length; i++) {
    				sum += ratings[i];
    			}
    			return ((Math.round((ratings[star]/sum)*100))+"%");
    		}
        };
    }


    function showRatings() {
        var allMovies = $(".movie");

        allMovies.on("click", function(e) {
            e.stopImmediatePropagation();
            var url = "https://movie-ranking.herokuapp.com/movies/" + $(this).data("id") + "/ratings";
            var currentElement = this;
            var mean;

            $.ajax({
                type: "GET",                                           // Wybór metody: GET lub POST.
                url: url,                                              // Ścieżka dostępu do pliku.
                timeout: 2000,                                          // Czas oczekiwania.
                success: function(data) {
                    var paramsToDisplay;
                    fetchRatings(data, $(currentElement));
                },
                error: function() {                                      // Wyświetlenie komunikatu o błędzie.
                    container.html("<div>Proszę spróbować wkrótce.</div>");
                },
                complete: function()  {
                    if ($(currentElement).data("voted")) {
                        console.log("wypisac, ze osoba juz glosowala i dzieki");
                    } else {
                        if ($(currentElement).data("fetched")) {
                            console.log("no działa!!!");
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
                }
            });
        });
    }


    function calculateMean(array) {
        var sum = 0;
        var counter = 0;
        for (var i = 0; i < array.length; i++) {
            sum += (array[i] * (i+1));
            counter += array[i];
        }
        return (sum/counter).toFixed(2);
    }

    function createRatingPanel(movie) {

        var wrapper = $("<div>", {class: "rating_panel_wrapper"});
        var ratingsDistribution = $("<div>", {class: "distribution"});
        var averageRating = $("<div>", {class: "average"}).text("Average user's rating: ");
        var span = $("<span>", {class: "avg_number"});
        var msg = $("<h4>").text("You can rate this movie (1-5 stars)!");
        var buttonsToRate = $("<div>", {class: "buttons_container"});

        buttonsToRate.append(msg);

        var highestPossibleRating = 5;

        for (var i=0; i < highestPossibleRating; i++) {
            buttonsToRate.append($("<button>", {class: "button_to_rate"}).attr("data-rating", (i+1))
                         .append($("<i>", {class: "fa fa-star"}).attr("aria-hidden", "true")));
        }

        wrapper.append(ratingsDistribution);
        wrapper.append(buttonsToRate);

        averageRating.append(span);
        wrapper.append(averageRating);

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
        var buttonsToRate = $(".button_to_rate");

        buttonsToRate.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var userRating = $(this).data("rating");
            var wrapper = $(".rating_panel_wrapper");

            var newRating = {
                "rating": userRating
            };

            $.ajax({
                type: "POST",                                           // Wybór metody: GET lub POST.
                url: url,
                data: newRating,
                dataType: "json",                                             // Ścieżka dostępu do pliku.
                timeout: 2000,                                          // Czas oczekiwania.
                success: function() {
                    console.log("wowowowo!!!");
                    $(parentEl).attr("data-voted", true);
                    wrapper.remove();
                    // function removeRatingPanel();

                },
                error: function() {                                      // Wyświetlenie komunikatu o błędzie.
                    container.html('<div class="loading">Proszę spróbować wkrótce.</div>');
                }
            })
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
                console.log(rows);
                movieListing.append(rows.reverse());
            } else {
                movieTitles.addClass("ascending");
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
        })
    }

    function createTable(container) {
        var table = $("<table>", {class: "rating_table"});
	    var tableBody = $("<tbody>", {class: "rating_display_container"});


	    for (var i = 0; i < 5; i++) {
		          var tableRow = $("<tr>", {class: "rating_row"});
		                tableRow.append($("<td>", {class: "star_counter"}).text((i+1) + " star"));
		                tableRow.append($("<td>", {class: "rating_percentage_visualition"})
		                        .append($("<div>", {class: "progress_bell"})));

		                tableRow.append($("<td>", {class: "rating_percentage_number"}));

		                tableBody.append(tableRow);
	   }

	   table.append(tableBody);
	   $(container).append(table);
    }

    function animateRatings(table, object) {

        console.log(table);


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
