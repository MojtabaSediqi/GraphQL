using Movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movies.GraphQL.Client.DTO
{
    internal class MoviesResponse
    {
        public List<Movie> Movies { get; set; }
    }
}
