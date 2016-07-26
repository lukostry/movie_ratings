/*Module for calculating movie ratings*/

MOVIE_RATING_APP.namespace("MOVIE_RATING_APP.calcRatings");

MOVIE_RATING_APP.calcRatings = (function() {
    var sum = 0,
        length = 0,
        distributionArray = [0, 0, 0, 0, 0],
        //the parameters that would be displayed in the app:
        paramsToDisplay = {
            mean: 0,
            ratingDistPrc: [0, 0, 0, 0, 0]
        };

    var getParams = function(movie) {
        //at the beginning reset all the paramters to the initial values
        sum = 0;
        length = 0,
        distributionArray = [0, 0, 0, 0, 0];
        $.each(movie, function callback(index, element) {
            sum += element.rating;
            distributionArray[element.rating - 1] += 1;
        });

        length = movie.length;
    };

    var calcParamsToDisplay = function(movie) {
        getParams(movie);
        //reset parameters to the initial values
        paramsToDisplay.mean = 0;
        paramsToDisplay.ratingDistPrc = [0, 0, 0, 0, 0];

        paramsToDisplay.mean = (sum/length).toFixed(2);
        $.each(distributionArray, function callback(index, element) {
            paramsToDisplay.ratingDistPrc[index] = (Math.round((element / length)*100)) + "%";
        });
    };

    var getMean = function() {
        return paramsToDisplay.mean;
    };

   var getDistArray = function() {
       return paramsToDisplay.ratingDistPrc;
   };

    //public API
    return {
        calcParamsToDisplay: calcParamsToDisplay,
        getMean: getMean,
        getDistArray: getDistArray
    };
}());
