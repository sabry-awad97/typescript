import axios from 'axios';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series';
  Poster: string;
}

export interface TMovieData {
  Search?: Movie[];
  Error?: string;
  Response: 'True' | 'False';
}

export interface TMovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const omdbapi = axios.create({
  baseURL: 'http://www.omdbapi.com',
  params: {
    apikey: 'f9c3dd87',
  },
});

export const fetchMovies = async (searchTerm: string): Promise<Movie[]> => {
  const response = await omdbapi.get<TMovieData>('/', {
    params: {
      s: searchTerm,
    },
  });

  return response.data.Search || [];
};

export const fetchMovieDetails = async (movie: Movie) => {
  const response = await omdbapi.get<TMovieDetails>('/', {
    params: {
      i: movie.imdbID,
    },
  });

  return response.data;
};
