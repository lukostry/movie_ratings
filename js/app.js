$(document).ready(function () {

    function insertContent(movies) {
        var listing = $(".movie_listing");
        $.each(movies, function(index, movie) {
            var tr = $("<tr>", {class: "movie"});
            tr.attr("data-id", movie.id);
            var title = $("<td>").text(movie.title);
            var posterContainer = $("<td>");
            var moviePoster = $("<img>").attr("src", movie.poster);

            posterContainer.append(moviePoster);

            tr.append(title);
            tr.append(posterContainer);

            listing.append(tr);
            // tr[0].setAttribute("data-id", movie.id);
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
            timeout: 2000,                                          // Czas oczekiwania.
            beforeSend: function() {                                // Przed wykonaniem żądania Ajax.
                container.append('<div id="load">Wczytywanie</div>');  // Wczytanie komunikatu.
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
            fail: function() {                                      // Wyświetlenie komunikatu o błędzie.
                container.html('<div class="loading">Proszę spróbować wkrótce.</div>');
            }
        });
    }
    loadMovies();

    function showRatings() {
        var allMovies = $(".movie");

        allMovies.on("click", function() {
            var url = "https://movie-ranking.herokuapp.com/movies/" + $(this).data("id") + "/ratings";
            var currentElement = this;
            var mean;

            $.ajax({
                type: "GET",                                           // Wybór metody: GET lub POST.
                url: url,                                              // Ścieżka dostępu do pliku.
                timeout: 2000,                                          // Czas oczekiwania.
                success: function(data) {

                    fetchRatings(data);

                    if ($(currentElement).data("voted")) {
                        console.log("wypisac, ze osoba juz glosowala i dzieki");
                    } else {
                        insertRatingPanel(currentElement);
                        rateMovie(url, currentElement);
                    }
                },
                fail: function() {                                      // Wyświetlenie komunikatu o błędzie.
                    container.html("<div>Proszę spróbować wkrótce.</div>");
                }
            });
        });
    }

    function fetchRatings(data) {
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

    function insertRatingPanel(movie) {
        var wrapper = $("<div>", {class: "wrapper"});
        var ratingsDistribution = $("<div>", {class: "distribution"});
        var averageRating = $("<div>", {class: "average"}).text(mean);
        var buttonsToRate = $("<div>", {class: "buttons_container"});

        var highestPossibleRating = 5;

        for (var i=0; i < highestPossibleRating; i++) {
            buttonsToRate.append($("<button>", {class: "button_to_rate"}).attr("data-rating", (i+1)));
        }

        wrapper.append(ratingsDistribution);
        wrapper.append(averageRating);
        wrapper.append(buttonsToRate);

        $(movie).append(wrapper);
    }

    function rateMovie(url, parentEl) {
        var buttonsToRate = $(".button_to_rate");

        buttonsToRate.on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var userRating = $(this).data("rating");
            var wrapper = $(".wrapper");

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
                fail: function() {                                      // Wyświetlenie komunikatu o błędzie.
                    container.html('<div class="loading">Proszę spróbować wkrótce.</div>');
                }
            })
        });
    }

    function sortMovies() {
        var table = $("table");
        var $tbody = table.find("tbody");        // Store table body
        var rows = $(".movie").toArray();
        var movieTitles = $(".titles");

        movieTitles.on("click", function(){
            console.log("works");
            if (movieTitles.hasClass("ascending") || movieTitles.hasClass("descending")) {
                movieTitles.toggleClass("ascending descending");
                console.log(rows);
                $tbody.append(rows.reverse());
            } else {
                movieTitles.addClass("ascending");
                rows.sort(function (a, b) {
                    a = $(a).find("td").eq(0).text();
                    b = $(b).find("td").eq(0).text();

                    if (a < b) {
                        return -1;
                    } else {
                        return a > b ? 1 : 0;
                    }
                });
                $tbody.append(rows);
            }
        })
    }

});
