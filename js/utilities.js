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
