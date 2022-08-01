import {
  fetchMovies,
  Movie,
  fetchMovieDetails,
  TMovieDetails,
} from './lib/omdbapi';
import getMovieTemplate from './lib/getMovieTemplate';
import createAutoComplete from './lib/autocomplete';

import './style.css';
import { runComparison } from './lib/runComparison';

const autoCompleteConfig = {
  renderItem({ Title, Poster, Year }: Movie): string {
    return `
      <a class="dropdown-item">
        <img src="${Poster === 'N/A' ? '' : Poster}" />
        ${Title} (${Year})
      </a>
    `;
  },

  inputValue(movie: Movie): string {
    return movie.Title;
  },
  fetchData: fetchMovies,
};

let leftMovie: TMovieDetails;
let rightMovie: TMovieDetails;

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector<HTMLDivElement>('#left-autocomplete')!,
  async onItemSelect(movie): Promise<void> {
    const tutorial = document.querySelector<HTMLDivElement>('.tutorial')!;
    tutorial.classList.add('is-hidden');

    const summaryEl = document.querySelector<HTMLDivElement>('#left-summary')!;

    leftMovie = await fetchMovieDetails(movie);
    const template = getMovieTemplate(leftMovie);
    summaryEl.innerHTML = template;

    runComparison(leftMovie, rightMovie);
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector<HTMLDivElement>('#right-autocomplete')!,
  async onItemSelect(movie): Promise<void> {
    const tutorial = document.querySelector<HTMLDivElement>('.tutorial')!;
    tutorial.classList.add('is-hidden');

    const summaryEl = document.querySelector<HTMLDivElement>('#right-summary')!;

    rightMovie = await fetchMovieDetails(movie);
    const template = getMovieTemplate(rightMovie);
    summaryEl.innerHTML = template;

    runComparison(leftMovie, rightMovie);
  },
});
