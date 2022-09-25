var currentDateEl = $("#date-and-time");
var currentDate;
var movieTitleInput = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");
var movieList = document.querySelector("#list-history");
var movieTitleText = "";
var movieTitles = [];

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
        movieList.appendChild(li);
    };
};

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

    storeMovieTitles();
    renderMovieTitles();
});


init()

// TO DO: INCLUDE LINK TO API CALL ON PREVIOUS SEARCH HISTORY ITEMS