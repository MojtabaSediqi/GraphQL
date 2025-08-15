using GraphQL;
using GraphQL.MicrosoftDI;
using Microsoft.EntityFrameworkCore;
using Movies.API.Data;
using Movies.API.GraphQL.Types;

namespace Movies.API.GraphQL.Queries
{
    public class MovieQuery : ObjectGraphType
    {
        public MovieQuery(MoviesDbContext db)
        {
            Field<ListGraphType<MovieType>>("movies")
                .Resolve(a => db.Movies.ToList());

            Field<MoviePageType>("getPagedMovies")
                .Arguments(
                new QueryArguments(
                    new QueryArgument<IntGraphType> { Name = "page", DefaultValue = 1 },
                    new QueryArgument<IntGraphType> { Name = "pageSize", DefaultValue = 10 }
                    )
                )
                .Resolve(context =>
                {
                var page = context.GetArgument<int>("page");
                var pageSize = context.GetArgument<int>("pageSize");
                var totalCount = db.Movies.Count();

                var items = db.Movies.Skip((page - 1) * pageSize).Take(pageSize).ToList();
                return new MoviePage { TotalCount = totalCount, Items = items };
                });


            Field<MovieType>("movie")
                .Arguments(new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>>() { Name = "id" }))
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");
                    return db.Movies.Single(a => a.Id == id);
                });
        }
    }
}
