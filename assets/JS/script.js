//Global variables
var currentDateEl = $("#date-and-time");
var currentDate;
var movieTitleInput = document.querySelector("#movie-search");
var searchForm = document.querySelector("#search-form");
var searchButton = document.querySelector('#search-button')
var movieList = document.querySelector("#list-history");
var movieTitleText = "";
var movieTitles = [];
var clearHistoryBtn = document.querySelector("#clear-history");

//On page load determines if there is any local storage saved and executes time
function init() {
    var storedMovies = JSON.parse(localStorage.getItem("movieTitles"));

    if (storedMovies !== null) {
        movieTitles = storedMovies;
    }

    renderMovieTitles();
    currentMomentDate();
};

// Determines the current time
function currentMomentDate() {
    currentDate = dayjs().format("dddd hh:mm A");
    currentDateEl.text(currentDate);
};

// Time refreshes on a set Interval
var refresh = setInterval(function () {
    currentMomentDate();
}, 1000);

// Displays the movie titles on the previous history page
function renderMovieTitles() {
    movieList.textContent = "";
    for (var i = 0; i < movieTitles.length; i++) {
        var movieTitle = movieTitles[i];

        var li = document.createElement("li");
        var newMovieTitle = movieTitle.split(" ");  
        var title = "";
        for (var j = 0; j < newMovieTitle.length; j++) {
          title = title + newMovieTitle[j].substring(0,1).toUpperCase() + newMovieTitle[j].substring(1).toLowerCase() + " ";
        };
        li.textContent = "";
        li.textContent = title;
        li.setAttribute("data-index", i);
        li.addEventListener("click", function() {
            var queryString = 'results.html?q=' + title;
            location.assign(queryString);
        });
        movieList.appendChild(li);
    };
};

// Stores movie titles to local storage
function storeMovieTitles() {
    localStorage.setItem("movieTitles", JSON.stringify(movieTitles));
};

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    movieTitleText = movieTitleInput.value;

    if (movieTitleText === "") {
        return;
    }

    movieTitles.push(movieTitleText);

    var queryString = 'results.html?q=' + movieTitleText;
    location.assign(queryString);

    storeMovieTitles();
    renderMovieTitles();
});

// Clear previous history
clearHistoryBtn.addEventListener("click", function() {
    localStorage.clear();
    movieTitles = [];
    renderMovieTitles();
});


init()

