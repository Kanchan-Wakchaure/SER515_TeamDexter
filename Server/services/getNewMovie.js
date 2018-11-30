const request = require('request-promise');
const keys = require('../config/keys');
const MovieList = require('../models/MovieList');

module.exports = {

    getRefresh: (release_date) => {

        var genre_list = [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 12,
                "name": "Adventure"
            },
            {
                "id": 16,
                "name": "Animation"
            },
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 80,
                "name": "Crime"
            },
            {
                "id": 99,
                "name": "Documentary"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10751,
                "name": "Family"
            },
            {
                "id": 14,
                "name": "Fantasy"
            },
            {
                "id": 36,
                "name": "History"
            },
            {
                "id": 27,
                "name": "Horror"
            },
            {
                "id": 10402,
                "name": "Music"
            },
            {
                "id": 9648,
                "name": "Mystery"
            },
            {
                "id": 10749,
                "name": "Romance"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            },
            {
                "id": 10770,
                "name": "TV Movie"
            },
            {
                "id": 53,
                "name": "Thriller"
            },
            {
                "id": 10752,
                "name": "War"
            },
            {
                "id": 37,
                "name": "Western"
            }
        ]


        var i = 501;
        var myvar = setInterval(getData, 15000);


        function getData() {


            i++;
            if (i >= 503) {
                clearInterval(myvar);                
            }

            request(`https://api.themoviedb.org/3/discover/movie?api_key=9e82bc133417a5be5b0329b47e5779eb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}`, function (error, response, body) {

                if (!error && response.statusCode == 200) {
                    var obj = JSON.parse(body);

                    for (const item of obj.results) {

                        insert(item);
                    }
                }
                else {
                    console.log(error)
                }
            });

        }


        function insert(bodyy) {



            const movieList = new MovieList(bodyy);
            console.log(`https://api.themoviedb.org/3/movie/${movieList.id}/credits?api_key=27cf025538cae1af45246a85b9dbde84`)
            request(`https://api.themoviedb.org/3/movie/${movieList.id}/credits?api_key=27cf025538cae1af45246a85b9dbde84`, function (error, response, body) {
         
                for (var k in bodyy.genre_ids) {
                    for (var j in genre_list) {
                        if (bodyy.genre_ids[k] == genre_list[j]['id']) {
                            movieList.genre_list.push((genre_list[j]['name']))

                        }
                    }

                }

                movieList["cast"].push(JSON.parse(body)["cast"])              

                movieList.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("saved new movie in database");
                    }

                });


            })
        }


    }
}