import { TMovieDetails } from './omdbapi';

export const runComparison = (
  leftMovie: TMovieDetails,
  rightMovie: TMovieDetails
) => {
  if (!leftMovie || !rightMovie) return;

  const leftSideStats = document.querySelectorAll<HTMLDivElement>(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll<HTMLDivElement>(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = leftStat.dataset.value;
    const rightSideValue = rightStat.dataset.value;

    if (leftSideValue && rightSideValue && rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};
