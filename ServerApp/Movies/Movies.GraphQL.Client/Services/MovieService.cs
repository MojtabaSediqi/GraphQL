using GraphQL;
using Movies.GraphQL.Client.DTO;
using Movies.Models;
using System;

namespace Movies.GraphQL.Client.Services
{
    public class MovieService : GraphQLClient
    {
        public async Task<Movie> GetMovie(int id)
        {
            var query = new GraphQLRequest()
            {
                Query = "query GetMovie($movieId: Int!) { movie(id:$movieId) {  id name description lunchDate genre } }",
                Variables = new { movieId = id }
            };

            var response = await Client.SendQueryAsync<MovieResponse>(query);
            return response.Data.Movie;
        }
        public async Task<List<Movie>> GetMovies()
        {
            var query = new GraphQLRequest()
            {
                Query = "{ movies { id name description lunchDate genre } }"
            };

            var response = await Client.SendQueryAsync<MoviesResponse>(query);
            return response.Data.Movies;
        }

        public async Task<Movie> AddMovie(Movie movie)
        {
            var query = new GraphQLRequest()
            {
                Query = "mutation AddMovie($movie: MovieInput! ) { movie: addMovie(movie: $movie) { id name description lunchDate genre } }",
                Variables = new { movie = new { movie.Name, movie.Description, movie.Genre, movie.LunchDate } }
            };

            var response = await Client.SendMutationAsync<MovieResponse>(query);
            return response.Data.Movie;
        }

        public async Task<Movie> UpdateMovie(int id, Movie movie)
        {
            var query = new GraphQLRequest()
            {
                Query = "mutation UpdateMovie($movieId: ID! $movie: MovieInput! ) { movie: updateMovie(id: $movieId, movie: $movie) { id name description lunchDate genre } }",
                Variables = new { movieId = id, movie = new { movie.Name, movie.Description, movie.Genre, movie.LunchDate } }
            };

            var response = await Client.SendMutationAsync<MovieResponse>(query);
            return response.Data.Movie;
        }

        public async Task<Boolean> DeleteMovie(int id)
        {
            var query = new GraphQLRequest()
            {
                Query = "mutation DeleteMovie($id: ID!) { deleted: deleteMovie(id: $id) }",
                Variables = new { id = id }
            };

            var response = await Client.SendMutationAsync<DeleteResponse>(query);
            return response.Data.Deleted;
        }

        public IObservable<GraphQLResponse<MovieResponse>> SubscriptionMovieAdded()
        {
            var query = new GraphQLRequest()
            {
                Query = "subscription MovieAdded { movie: movieAdded { id name description lunchDate genre } }",
            };

            return Client.CreateSubscriptionStream<MovieResponse>(query);
        }
    }
}
