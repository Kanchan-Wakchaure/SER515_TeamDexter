/*
* A model class for movie.
* @Author: Sai Saran Kandimalla.
* @version 1: created on 09/18/2018.
*/
export class Movie {
    public name: String;
    public genre: String;
    public imageUrl: String;

    constructor(name: String, genre: String, imageUrl: String) {
        this.name = name;
        this.genre = genre;
        this.imageUrl = imageUrl;
    }
}