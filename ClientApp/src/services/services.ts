import { gql } from "@apollo/client";

//**** Query ****/

const GET_PAGED_MOVIES = gql`
  query GetPagedMovies($page: Int!, $pageSize: Int!) {
    getPagedMovies(page: $page, pageSize: $pageSize) {
      totalCount
      items {
        id
        name
        description
        lunchDate
        genre
        reviews {
          id
        }
      }
    }
  }
`;

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      description
      lunchDate
      genre
      reviews {
        id
      }
    }
  }
`;

const GET_MOVIE = gql`
  query GetMovie($id: Int!) {
    movie(id: $id) {
      id
      name
      description
      lunchDate
      genre
      reviews {
        id
      }
    }
  }
`;

//**** Mutation ****/

const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!) {
    addMovie(movie: $movie) {
      id
      name
      description
      lunchDate
      genre
      reviews {
        id
      }
    }
  }
`;

const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: ID!, $movie: MovieInput!) {
    updateMovie(id: $id, movie: $movie) {
      id
      name
      description
      lunchDate
      genre
      reviews {
        id
      }
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`;

export const server = {
  Queries: {
    GET_PAGED_MOVIES,
    GET_MOVIES,
    GET_MOVIE,
  },
  Mutations: {
    ADD_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
  },
};
