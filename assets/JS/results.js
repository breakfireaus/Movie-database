

var currentDateEl = $("#date-and-time");
var currentDate;

function currentMomentDate() {
  currentDate = dayjs().format("dddd hh:mm A");
  currentDateEl.text(currentDate);
};

// Time refreshes on a set Interval
var refresh = setInterval(function () {
  currentMomentDate();
}, 1000);

// global variables

var searchButton = document.querySelector('#search-button')

// APIs


// Declare global variables
var searchButton = document.querySelector('#search-button')

// API keys

var musicAPIkey = '327d3bf7241329fd83a0889ff32d9943'


//previous search history appears on page and persistent(local storage)
// function
// search bar 
// and button to save to local storage
// retrieve from local Storage
// creating the list items

// if no results found else results pop

//when the result is clicked it appears in the modal with an image of the movie and list of soundtracks
// function to pull the image of the movie that was clicked
// function to pull from music database api to show soundtrack File
// append into modal





// Modal JS 
// Get DOM Elements
const modal = document.querySelector('#result-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('#close-modal');

// Events
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

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

//obtain music tracks
let resultsArray = [];


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

function searchResults(event) {
  event.preventDefault()
  var searchInput = document.querySelector('input[name="movie-search"]')
  var searchInputVal = searchInput.value;
  var movieAPIkey = 'https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=' + searchInputVal;


  fetch(movieAPIkey)

  
  document.querySelector('#results').innerHTML=""

    fetch(movieAPIkey)

    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i = 0; i < data.results.length; i++) {

      resultsArray = [...data.results];
      for (var i=0; i < 5; i++) {

        var resultsCard = document.createElement('button');
        resultsCard.addEventListener('click', resultsModalDisplay);
        resultsCard.textContent = data.results[i].original_title + ', ' + data.results[i].release_date;
        resultsCard.setAttribute('id', data.results[i].id);
        document.querySelector('#results').append(resultsCard);
      }

      function resultsModalDisplay() {
        modal.style.display = 'block';
        var modalTitle = document.querySelector('#movie-title-filled');
        var modalImage = document.querySelector('#image');
        modalTitle.textContent = data.results[i].original_title;
        modalImage.href = data.results[i].poster_path;
      }
    });
}

function playlistPull() {
  fetch('https://api.deezer.com/search/album?q=' + resultsCard.innerHTML + 'soundtrack&appid=' + musicAPIkey)


  .then (function (response) {
      return response.json() 
  })
  .then (function (data) {
    console.log(data)
    var searchID = data.id
    fetch('https://api.deezer.com/album/' + searchID)

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

      for (var i = 0; i < data.tracks.length; i++) {
        var albumTrack = document.createElement(li)
        albumTrack.textContent = data.tracks[i].title + ' by ' + data.tracks[i].artist.name 
        document.querySelector('#music-list').append(albumTrack)
      }

    })
}
