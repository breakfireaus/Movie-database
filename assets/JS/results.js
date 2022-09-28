// global variables
var currentDateEl = $("#date-and-time");
var currentDate;
var searchButton = document.querySelector('#search-button')

function currentMomentDate() {
  currentDate = dayjs().format("dddd hh:mm A");
  currentDateEl.text(currentDate);
};

// Time refreshes on a set Interval
var refresh = setInterval(function () {
  currentMomentDate();
}, 1000);


// API keys
var musicAPIkey = '327d3bf7241329fd83a0889ff32d9943'

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


let resultsArray = [];

// Searches the movie API for the movie title
searchButton.addEventListener("click", searchResults);

let movieSearchParams = false

function searchResults(event) {

  let searchInputVal = ""
  if (event) {
    event.preventDefault();
  }

  document.querySelector("#results").innerHTML = "";
  if (!movieSearchParams) {
    var searchInput = document.querySelector('input[name="movie-search"]');
    searchInputVal = searchInput.value;
  } else {
    searchInputVal = document.location.search.split("=").pop();
  }
  var movieAPIkey = "https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=" + searchInputVal;
  
  document.querySelector('#search-display').textContent = searchInputVal
  
  fetch(movieAPIkey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      resultsArray = [...data.results]
        for (var i = 0; i < 5; i++) {
          var resultsCard = document.createElement("button");
          resultsCard.addEventListener("click", resultsModalDisplay);
          resultsCard.textContent = resultsArray[i].original_title + ", " + resultsArray[i].release_date;
          resultsCard.setAttribute('id', resultsArray[i].id);
          document.querySelector("#results").append(resultsCard);
          resultsCard.classList.add('search-results');
        }

        function resultsModalDisplay() {
          modal.style.display = "block";
          var modalTitle = document.querySelector("#movie-title-filled");
          var modalImage = document.querySelector("#image");
          console.log(resultsCard.getAttribute('id'))
          var chosenSearch = resultsArray.find((item) => {
            return item.id == resultsCard.getAttribute('id')
          })
          console.log(chosenSearch)
          modalTitle.textContent = chosenSearch.original_title
          modalImage.src = 'https://image.tmdb.org/t/p/original/' + chosenSearch.poster_path
        }

        
    });
}

function playlistPull(event) {
  event.preventDefault()
  var searchInput = document.querySelector('input[name="movie-search"]');
  var searchInputVal = searchInput.value;
  var musicAPILink = 'https://api.deezer.com/search/playlist?q=' + searchInputVal + '+soundtrack&appid=327d3bf7241329fd83a0889ff32d9943&output=json';
  fetch(musicAPILink, {mode: "no-cors"})
  .then (function (response) {
    console.log(response);
    return response.json();
  })
  .then (function (data) {
    console.log(data);
    //var searchID = data.id
    fetch('https://api.deezer.com/album/' + searchID)

    .then(function (response) {
      console.log(response)
        return response.json()
      

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
            albumTrack.textContent = data.tracks[i].title + ' by ' + data.tracks[i].artist.name
            document.querySelector('#music-list').append(albumTrack)
          }
        }
        )
    }

    )
}
)}

if (document.location.search.length > 0) {
  movieSearchParams = true
  searchResults();
}

