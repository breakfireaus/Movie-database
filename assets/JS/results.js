// global variables
var currentDateEl = $("#date-and-time");
var currentDate;
var searchButton = document.querySelector('#search-button');
var searchInput;
var searchID;

//Provides current day and time to all pages
function currentMomentDate() {
  currentDate = dayjs().format("dddd hh:mm A");
  currentDateEl.text(currentDate);
};

// Time refreshes on a set Interval
var refresh = setInterval(function () {
  currentMomentDate();
}, 1000);

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

//Array used to store information from searched movies
let resultsArray = [];

// Adds event listener to search buttons
searchButton.addEventListener("click", searchResults);

//Determines movie title search parameters
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
  
  // Link used to search the first movie API
  var movieAPIkey = "https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=" + searchInputVal;

  document.querySelector('#search-display').textContent = searchInput.value;
  document.querySelector("#results").innerHTML = "";

  fetch(movieAPIkey)
    .then(function (response) {
      return response.json();
    })
    //Pulls the first five search results from the array fetched and displays them on the page
    .then(function (data) {
      resultsArray = [...data.results]
      console.log(resultsArray)
        for (var i = 0; i < 5; i++) {
          var resultsCard = document.createElement("button");
          resultsCard.addEventListener("click", resultsModalDisplay);
          resultsCard.textContent = resultsArray[i].original_title 
          resultsCard.setAttribute('id', resultsArray[i].id);
          resultsCard.setAttribute("data-image", resultsArray[i].poster_path);
          document.querySelector("#results").append(resultsCard);
          resultsCard.classList.add('search-results');
        }

        //Displays detailed movie information in the modal based on the result selected 
        function resultsModalDisplay() {
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
          secondSearch();

          //Fetches a second movie API for additional movie information on the modal
          function secondSearch() {
            var OMDBAPILink = 'http://www.omdbapi.com/?apikey=406ff228&t=' + modalTitle.textContent;
            fetch(OMDBAPILink)
            .then(function (response) {
              return response.json()
            })
            .then(function (data) {
              console.log(data)
              document.querySelector('#movie-details').innerHTML=" "
              var releaseYear = document.createElement('p')
              releaseYear.textContent = "Year of release: " + data.Year
              document.querySelector('#movie-details').append(releaseYear)
              releaseYear.classList.add('mb-8')
              var starringActors = document.createElement('p')
              starringActors.textContent = 'Starring: ' + data.Actors 
              document.querySelector('#movie-details').append(starringActors)
              starringActors.classList.add('mb-8')
              var plotContainer = document.createElement('p')
              plotContainer.textContent = data.Plot
              document.querySelector('#movie-details').append(plotContainer)
              plotContainer.classList.add('mb-8')
              for (i = 0; i < data.Ratings.length; i++) {
                var criticRatings = document.createElement('li')
                criticRatings.textContent = data.Ratings[i].Source + ": " + data.Ratings[i].Value
                document.querySelector('#movie-details').append(criticRatings)
              }
            })
          }
        }
    });
}

//Clears the page of search results
var clearHistoryBtn = document.querySelector("#clear-results");
clearHistoryBtn.addEventListener("click", function() {
  document.querySelector("#results").innerHTML = "";
})

//Searches for a query string from home page and previous results 
if (document.location.search.length > 0) {
  movieSearchParams = true
  searchResults();
}