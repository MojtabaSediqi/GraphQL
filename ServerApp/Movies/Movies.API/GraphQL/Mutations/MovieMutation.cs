using GraphQL;
using Movies.API.Data;
using Movies.API.GraphQL.Subscriptions.Messages;
using Movies.API.GraphQL.Types;
using Movies.API.GraphQL.Types.Inputs;

namespace Movies.API.GraphQL.Mutations
{
    public class MovieMutation : ObjectGraphType
    {
        public MovieMutation(MoviesDbContext db, MovieMessage movieMessage)
        {
            Field<MovieType>("addMovie").Arguments(
                new QueryArgument<NonNullGraphType<MovieInputType>>()
                {
                    Name = "movie",
                    Description = "Movie input parameter"
                }
             )
             .ResolveAsync(async context => {
                 var movie = context.GetArgument<Movie>("movie");
                 db.Movies.Add(movie);
                 await db.SaveChangesAsync();
                 movieMessage.AddMovie(movie);
                 return movie;
            });
            Field<MovieType>("updateMovie").Arguments(
                new QueryArgument<NonNullGraphType<IdGraphType>>()
                {
                    Name = "id",
                    Description = "Id input parameter"
                },
                new QueryArgument<NonNullGraphType<MovieInputType>>()
                {
                    Name = "movie",
                    Description = "Movie input parameter"
                }
             )
             .ResolveAsync(async context => {
                 var movieId = context.GetArgument<int>("id");
                 var input = context.GetArgument<Movie>("movie");
                 var movie = await db.Movies.FindAsync(movieId);
                 if (movie == null)
                     throw new Exception("Movie not found");
                 movie.Name = input.Name;
                 movie.Description = input.Description;
                 movie.LunchDate = input.LunchDate;
                 movie.Genre = input.Genre;
                 await db.SaveChangesAsync();
                 return movie;
             });

            Field<BooleanGraphType>("deleteMovie").Arguments(
                new QueryArgument<NonNullGraphType<IdGraphType>>()
                {
                    Name = "id",
                    Description = "id of movie"
                }
             ).ResolveAsync(async context => {
                 var movieId = context.GetArgument<int>("id");
                 var movie = await db.Movies.FindAsync(movieId);

                 if(movie is not null)
                 {
                     db.Movies.Remove(movie);
                     await db.SaveChangesAsync();
                     return true;
                 }
                 return false;
             });
        }
    }
}
