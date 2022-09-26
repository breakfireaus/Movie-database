// Declare global variables
var searchButton = document.querySelector('#search-button')

// API keys
var musicAPIkey = '327d3bf7241329fd83a0889ff32d9943'

// Modal JS 
// Get DOM Elements
const modal = document.querySelector('#result-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('#close-modal');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
// end of modal script 

/* Gets the search parameters from the home page and previous history page
function getParams() {
  var searchParamsArr = document.location.search;
  var movieResults = searchParamsArr[0].split("=").pop();

  searchResults(movieResults);
}

// Searches the movie API using the search parameters
function searchResults(movieResults) {
  this.preventDefault();
  var movieQueryUrl = "https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=" + movieResults;

  fetch(movieQueryUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        var resultsCard = document.createElement("button");
        resultsCard.onlick = resultsModalDisplay;
        resultsCard.innerHTML = data.results[i].original_title;
        document.querySelector("#results").append(resultsCard);
      }
      function resultsModalDisplay() {
        document.querySelector('#movie-title-filled').textContent = data[i].original_title;
        document.querySelector('#image').src = data[i].poster_path;
      }
    })
} */

// Searches for the movie using the search form on the results page
searchButton.addEventListener('click', searchResults)

function searchResults(e) {
  e.preventDefault()
  var searchInput = document.querySelector('input[name="movie-search"]')
  var searchInputVal = searchInput.value;
  var movieAPIkey = 'https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=' + searchInputVal;

  fetch(movieAPIkey)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        var resultsCard = document.createElement('button');
        resultsCard.onclick = resultsModalDisplay;
        resultsCard.innerHTML = data.results[i].original_title;
        document.querySelector('#results').append(resultsCard)
      }

      function resultsModalDisplay() {
        document.querySelector('#movie-title-filled').textContent = data[i].original_title;
        document.querySelector('#image').src = data[i].poster_path;
      }
    });
}

function playlistPull() {
  fetch('https://api.deezer.com/search/album?q=' + resultsCard.innerHTML + 'soundtrack&appid=' + musicAPIkey)
    .then(function (response) {
      if (response.status === 404) {
        console.log('No soundtrack could be found')
      } else {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data)
      var searchID = data.id

      fetch('https://api.deezer.com/album/' + searchID)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log(data)
          for (var i = 0; i < data.tracks.length; i++) {
            var albumTrack = document.createElement(li)
            albumTrack[i].textContent = data.tracks[i].title + ' by ' + data.tracks[i].artist.name
            albumTrack.append(document.querySelector('#music-list'))
          }
        })
    })
}

