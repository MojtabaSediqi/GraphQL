
using Movies.GraphQL.Client.Services;
using Movies.Models;
using Movies.Models.Enums;

var service = new MovieService();

var sub = service.SubscriptionMovieAdded();
sub.Subscribe(response =>
{
    Console.WriteLine($"Sub - Movie added: {response.Data.Movie.Id} - {response.Data.Movie.Name}");
});

/*
var movie = await service.GetMovie(12);
Console.WriteLine($"Movie: {movie.Name}");

var movies = await service.GetMovies();
Console.WriteLine($"Total of Movie: {movies.Count}");

var newMovie = new Movie()
{
    Name = "Film 2",
    Description = "Description of Movie 2",
    Genre = MovieGenre.Comedy,
    LunchDate = DateTime.Now
};

//var addedMovie = await service.AddMovie(newMovie);
//Console.WriteLine($"Added Movie is - Id: {addedMovie.Id}, Name: {addedMovie.Name}");

var updateMovie = new Movie()
{
    Name = "Film Id 53",
    Description = "Description of Movie Id 53",
    Genre = MovieGenre.Horror,
    LunchDate = DateTime.Now
};

//var updatedMovie = await service.UpdateMovie(53, updateMovie);
//Console.WriteLine($"Updated Movie is - Id: {updatedMovie.Id}, Name: {updatedMovie.Name}");

var MovieIdToDelete = 50;
bool deleted = await service.DeleteMovie(MovieIdToDelete);
Console.WriteLine($"Is movie deleted: Id - {MovieIdToDelete}, Status - {deleted}");
*/

Console.ReadKey();