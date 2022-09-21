
// time

var currentDateEl = $('#date-and-time');
var currentDate;

// APIs
var movieAPI = 'https://api.themoviedb.org/3/movie/550?api_key=f773dd7be92f1943bb6b98b40e74c3bf'
var musicAPI = 'https://api.spotify.com'

function currentMomentDate() {
    currentDate = dayjs().format("dddd hh:mm A");
    currentDateEl.text(currentDate);
};
// Weather refreshes on a set Interval
var refresh = setInterval(function () {
    currentMomentDate();
}, 1000);


function init() {
    currentMomentDate();

};

init



