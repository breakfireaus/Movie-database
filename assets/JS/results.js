// global variables
var currentDateEl = $("#date-and-time");
var currentDate;
var searchButton = document.querySelector('#search-button');
var searchInput;


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
  searchInput = document.querySelector('input[name="movie-search"]');
  if (!movieSearchParams) {
    searchInputVal = searchInput.value;
  } else {
    movieSearchParams = false;
    searchInputVal = document.location.search.split("=").pop();
  }
  var movieAPIkey = "https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=" + searchInputVal;
  
  document.querySelector('#search-display').textContent = searchInput.value;
  document.querySelector("#results").innerHTML = "";
  
  fetch(movieAPIkey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      resultsArray = [...data.results]
      console.log(resultsArray)
        for (var i = 0; i < 5; i++) {
          var resultsCard = document.createElement("button");
          resultsCard.addEventListener("click", resultsModalDisplay);
          resultsCard.textContent = resultsArray[i].original_title + ", " + dayjs(resultsArray[i].release_date).format("DD-MM-YYYY");
          resultsCard.setAttribute('id', resultsArray[i].id);
          resultsCard.setAttribute("data-image", resultsArray[i].poster_path);
          document.querySelector("#results").append(resultsCard);
          resultsCard.classList.add('search-results');
        }

        function resultsModalDisplay() {
          playlistPull();
          modal.style.display = "block";
          var modalTitle = document.querySelector("#movie-title-filled");
          var modalImage = document.querySelector("#image");
          console.log(resultsCard.getAttribute('id'))
          var chosenSearch = resultsArray.find((item) => {
            return item.id == resultsCard.getAttribute('id')
          })
          console.log(chosenSearch)
          var image = this.getAttribute("data-image");
          modalTitle.textContent = this.textContent;
          modalImage.src = 'https://image.tmdb.org/t/p/original/' + image;
        }
    });
}

var clearHistoryBtn = document.querySelector("#clear-results");
clearHistoryBtn.addEventListener("click", function() {
  document.querySelector("#results").innerHTML = "";
})

function playlistPull() {
  //event.preventDefault()
  var searchInput = document.querySelector('input[name="movie-search"]');
  //var searchInputVal = searchInput.value;
  var musicAPILink = 'https://api.deezer.com/search/playlist?q=' + searchInput.value + '+soundtrack&appid=327d3bf7241329fd83a0889ff32d9943&output=json';
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

