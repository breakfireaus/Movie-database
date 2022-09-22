var currentDateEl = $("#date-and-time");
var currentDate;
var searchMovieEl = document.querySelector("#search-form");
var movieInputVal = document.querySelector("#search-input").value;
var searchButton = document.getElementById("search-button");

// Determines the current time
function currentMomentDate() {
    currentDate = dayjs().format("dddd hh:mm A");
    currentDateEl.text(currentDate);
};

// Time refreshes on a set Interval
var refresh = setInterval(function () {
    currentMomentDate();
}, 1000);

// Executes current time
function init() {
    currentMomentDate();
};

// Executes the search form
function handleSearchForm(event) {
    event.preventDefault();

    if (!movieInputVal) {
        console.error("You need to enter a movie title!");
        return;
    }

    var queryString = "./results.html?q=" + movieInputVal;
    var searchDate = newDate();

    localStorage.setItem("movie-search", searchDate, movieInputVal)

    location.assign(queryString);
};

searchMovieEl.addEventListener("submit", handleSearchForm);

// TO DO: CONSIDER HOW ADDING TO LOCAL STORAGE WORKS WITH THE ABOVE



