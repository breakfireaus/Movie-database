var currentDateEl = $("#date-and-time");
var currentDate;
var movieSearchForm = document.querySelector("#search-form");
var getMovieTitle = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");


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

// Prevent form from submitting when search button pressed
movieSearchForm.addEventListener("submit", function(event) {
    event.preventDefault();
});

// Executes search button when clicked and stores entered value to local storage
searchButton.addEventListener("click", function() {
    localStorage.setItem("movie-title", getMovieTitle.value);
});
