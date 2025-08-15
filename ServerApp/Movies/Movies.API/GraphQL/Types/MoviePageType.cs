namespace Movies.API.GraphQL.Types
{
    public class MoviePageType : ObjectGraphType<MoviePage>
    {
        public MoviePageType()
        {
            Field(x => x.TotalCount);
            Field<ListGraphType<MovieType>>("items").Resolve(context => context.Source.Items);
        }
    }
    public class MoviePage
    {
        public int TotalCount { get; set; }
        public List<Movie>? Items { get; set; }
    }
}
