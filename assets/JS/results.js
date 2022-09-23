// global variables

var movieresultclicked = 'Robocop' ;
var searchInput = document.querySelector('#search-input')


// APIs
<<<<<<< HEAD
var searchInputVal = searchInput.value;
var movieAPI = 'https://api.themoviedb.org?q=' + searchInputVal + '&api_key=f773dd7be92f1943bb6b98b40e74c3bf'
var musicAPI = 'https://api.spotify.com'
=======
var movieAPIkey = 'https://api.themoviedb.org?api_key=f773dd7be92f1943bb6b98b40e74c3bf'
var musicAPIkey = '327d3bf7241329fd83a0889ff32d9943'
>>>>>>> 79935d7ae1cceb0515c859dc647b3bec0defa17a




//previous search history appears on page and persistant(local storage)
// function
// search bar 
// and button to save to local storage
// retrive from local Storage
// creating the list items

//search results appear on page
// function
// pull the search the parameters
// search the movie api function includes the fetch for title
// if no results found else results pop

function searchResults() {

  var resultsCard = document.createElement(div)
  var resultsName = document.createElement(h3)
  resultsName.append(resultsCard)
   
  if (!searchInputVal) {
    console.log('Please enter a movie title')
  } else {
    fetch(movieAPI)
    .then(function(response) {
      if (response.status === 404) {
        resultsName.textcontent='No movies were found under that name'
      } else {
        return response.json()
      }
    }) 
    .then(function (data) {
      console.log(data)
    })
  }
}

//when the result is clicked it appears in the modal with an image of the movie and list of soundtracks
// function to pull an image of the movie that was clicked
// function to pull from music database api to show soundtrack File
// append into modal




// Modal JS 
// Get DOM Elements
const modal = document.querySelector('#result-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('#close-modal');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

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



document.getElementById("movie-title-filled").innerHTML = movieresultclicked;
<<<<<<< HEAD
// end of modal script
=======
// end of modal script 

//obtain music tracks
fetch('https://',{
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'moviemusic'
  })
}).then(res =>{
  return res.json()
})

>>>>>>> 79935d7ae1cceb0515c859dc647b3bec0defa17a
