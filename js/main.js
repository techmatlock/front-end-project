'use strict';
/* global data */
const $row = document.querySelector('.movies-row');
const $movieDetails = document.querySelector('.movie-details');
const $dataViewElements = document.querySelectorAll('[data-view]');
const $movieImg = document.querySelector('.learn__more-img');
const $movieTitle = document.querySelector('.movie-title');
const $releaseTitle = document.querySelector('.release-title');
const $summary = document.querySelector('.summary');
const $movieRankingWrapper = document.querySelector('.movie__ranking-wrapper');
const $movieRanking = document.querySelector('.movie-ranking');
const $votesNumber = document.querySelector('.votes-number');
const $genrePillsDiv = document.querySelector('.genre-pills');
const $sidebarToggle = document.querySelector('#sidebar-toggle');
const $mainToggle = document.querySelector('#main-toggle');
const $sidebar = document.querySelector('.sidebar');
const $main = document.querySelector('main');
const $sidebarMenu = document.querySelector('#sidebar-menu');
if (!$row) throw new Error('$row not found.');
if (!$movieDetails) throw new Error('$movieDetails not found.');
if (!$dataViewElements) throw new Error('$dataViewElements not found.');
if (!$movieImg) throw new Error('$movieImg not found.');
if (!$movieTitle) throw new Error('$movieTitle not found.');
if (!$releaseTitle) throw new Error('$releaseTitle not found.');
if (!$summary) throw new Error('$summary not found.');
if (!$movieRankingWrapper) throw new Error('$movieRankingWrapper not found.');
if (!$movieRanking) throw new Error('$movieRanking not found.');
if (!$votesNumber) throw new Error('$votesNumber not found.');
if (!$genrePillsDiv) throw new Error('$genrePillsDiv not found.');
if (!$sidebarToggle) throw new Error('$sidebarToggle not found.');
if (!$mainToggle) throw new Error('$mainToggle not found.');
if (!$sidebar) throw new Error('$sidebar not found.');
if (!$main) throw new Error('$main not found.');
if (!$sidebarMenu) throw new Error('$sidebarMenu not found.');
let moviesArr = [];
const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
async function getMovies() {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + foo + bar + baz,
      },
    };
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options,
    );
    if (!response.ok) throw new Error('Failed to get a response.');
    const responseData = await response.json();
    const resultsArr = responseData.results;
    data.entries = resultsArr;
    // Add to global variable
    moviesArr = resultsArr;
    // Render each movie to DOM
    for (let i = 0; i < resultsArr.length; i++) {
      const movieElement = renderCard(resultsArr[i]);
      $row.appendChild(movieElement);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
function viewSwap(view) {
  $dataViewElements.forEach((element) => {
    const dataViewValue = element.getAttribute('data-view');
    if (view === dataViewValue) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  });
}
function renderCard(data) {
  const $outerColumn = document.createElement('div');
  $outerColumn.setAttribute('class', 'column-fourth');
  const $cardDivElement = document.createElement('div');
  $cardDivElement.setAttribute('class', 'card');
  $cardDivElement.setAttribute('data-id', data.id.toString());
  $outerColumn.appendChild($cardDivElement);
  const $cardImage = document.createElement('img');
  $cardImage.setAttribute('class', 'card-img');
  $cardImage.setAttribute(
    'src',
    'http://image.tmdb.org/t/p/w500/' + data.poster_path,
  );
  $cardImage.setAttribute('alt', data.title + ' Movie Poster');
  $cardDivElement.appendChild($cardImage);
  const $favoriteIcon = document.createElement('i');
  $favoriteIcon.setAttribute('class', 'fa-regular fa-heart fa-2xl home-icon');
  $cardDivElement.appendChild($favoriteIcon);
  const $cardContent = document.createElement('div');
  $cardContent.setAttribute('class', 'card-content');
  $cardDivElement.appendChild($cardContent);
  const $cardContentRowTitle = document.createElement('div');
  $cardContentRowTitle.setAttribute('class', 'column-full row');
  const $cardTitle = document.createElement('h2');
  $cardTitle.setAttribute('class', 'card-title');
  $cardTitle.textContent = data.title;
  const $cardContentRatingRow = document.createElement('div');
  $cardContentRatingRow.setAttribute('class', 'column-full row');
  const $spanElement = document.createElement('span');
  $spanElement.setAttribute(
    'class',
    'circle row align-center justify-center card-rating',
  );
  $spanElement.textContent = data.vote_average.toFixed(1);
  $cardContentRowTitle.appendChild($cardTitle);
  $cardContentRatingRow.appendChild($spanElement);
  $cardContent.appendChild($cardContentRowTitle);
  $cardContent.appendChild($cardContentRatingRow);
  const $cardContentRowTwo = document.createElement('div');
  $cardContentRowTwo.setAttribute('class', 'column-full row');
  const $releaseDate = document.createElement('h3');
  $releaseDate.setAttribute('class', 'card-date');
  $releaseDate.textContent = data.release_date.split('-')[0];
  $cardContentRowTwo.appendChild($releaseDate);
  $cardContent.appendChild($cardContentRowTwo);
  const $cardBtnRow = document.createElement('div');
  $cardBtnRow.setAttribute('class', 'column-full');
  const $cardBtn = document.createElement('div');
  $cardBtn.setAttribute('class', 'card-btn');
  const $anchorElement = document.createElement('a');
  $anchorElement.setAttribute('href', '#');
  $anchorElement.textContent = 'Learn More';
  $cardBtn.appendChild($anchorElement);
  $cardBtnRow.appendChild($cardBtn);
  $cardContent.appendChild($cardBtnRow);
  return $outerColumn;
}
function renderMovieDetails(data) {
  $movieImg.setAttribute(
    'src',
    'http://image.tmdb.org/t/p/w500/' + data.poster_path,
  );
  $movieImg.setAttribute('alt', data.title + ' Movie Poster');
  $movieTitle.textContent = data.title;
  $releaseTitle.textContent = data.release_date.split('-')[0];
  $summary.textContent = data.overview;
  $movieRankingWrapper.setAttribute('class', 'movie__ranking-wrapper row');
  $movieRanking.textContent = data.vote_average.toFixed(1).toString();
  $movieDetails.appendChild($movieRankingWrapper);
  $votesNumber.textContent = data.vote_count.toLocaleString();
  for (let i = 0; i < data.genre_ids.length; i++) {
    const $genrePill = document.createElement('h4');
    const genreId = data.genre_ids[i];
    const genreName = genreMap[genreId];
    $genrePill.setAttribute(
      'class',
      'pill__line-sm row justify-center align-center pill-genre',
    );
    $genrePill.textContent = genreName;
    $genrePillsDiv.appendChild($genrePill);
  }
}
$row.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget.matches('a')) return;
  const $card = $eventTarget.closest('.card');
  if (!$card) throw new Error('$card not found');
  const cardId = $card?.getAttribute('data-id');
  if (!cardId) throw new Error('cardId not found.');
  for (let i = 0; i < moviesArr.length; i++) {
    if (moviesArr[i].id === +cardId) {
      viewSwap('learn-more');
      renderMovieDetails(moviesArr[i]);
    }
  }
});
$sidebarToggle.addEventListener('click', () => {
  $sidebar.classList.toggle('hidden');
  $main.classList.toggle('overlay');
});
$mainToggle.addEventListener('click', () => {
  $sidebar.classList.toggle('hidden');
  $main.classList.toggle('overlay');
});
$sidebarMenu.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget.matches('a')) return;
  const selectedView = $eventTarget.closest('a')?.getAttribute('id');
  if (!selectedView) throw new Error('selectedView not found.');
  $sidebar.classList.toggle('hidden');
  $main.classList.toggle('overlay');
  viewSwap(selectedView);
});
getMovies();
