
// time

var currentDateEl = $('#date-and-time');
var currentDate;

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


document.getElementById("search-button").addEventListener("click", saveData);
function saveData(){
    var movie= new Date();
    window.localStorage.setItem("Movie")
    
}



init



