var currentDateEl = $("#date-and-time");
var currentDate;

var movieTitleInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");
var movieList = document.querySelector("#list-history");
var movieTitleText = movieTitleInput.value;

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
    for (var i = 0; i < movieTitles.length; i++) {
        var movieTitle = movieTitles[i];

        var li = document.createElement("li");
        li.textContent = movieTitle;
        li.setAttribute("data-index", i);
        movieList.appendChild(li);
    }
};

function storeMovieTitles() {
    localStorage.setItem("movieTitles", JSON.stringify(movieTitles));
};

searchButton.addEventListener("submit", function(event) {
    event.preventDefault();

    if (movieTitleText === "") {
        return;
    }

    movieTitles.push(movieTitleText);

    storeMovieTitles();
    renderMovieTitles();
});


init()