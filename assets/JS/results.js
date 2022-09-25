// global variables


var searchInput = document.querySelector('#movie-search')
var searchButton = document.querySelector('#search-button')



// APIs


var movieAPIkey = 'https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=' + searchInputVal
var musicAPIkey = '327d3bf7241329fd83a0889ff32d9943'

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




//when the result is clicked it appears in the modal with an image of the movie and list of soundtracks
// function to pull the image of the movie that was clicked
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
  console.log(res)
  return res.json()
  
})

var searchInputVal = searchInput.value;

function searchResults() {
   
  if (!searchInputVal) {
    console.log('Please enter a movie title')
  } else {
    fetch(movieAPIkey)
    console.log(movieAPIkey)
    .then(function(response) {
      if (response.status === 404) {
        console.log('No movies were found under that name')
        return
      } else {
        return response.json()
      }
    }) 
    .then(function (data) {
      console.log(data)
      for (var i=0; i < data.length; i++) {
        var resultsCard = document.createElement(button)
        resultsCard.onclick = modalDisplay
        resultsCard[i].innerHTML = data[i].original_title
        resultsCard.append(document.querySelector('#results'))
      }

      function modalDisplay() {
        document.querySelector('#movie-title-filled').textContent = data[i].original_title
        document.querySelector('#image').src = data[i].poster_path

      }

    })

    
  }
}

function playlistPull() {
  fetch('https://api.deezer.com/search/album?q=' + resultsCard.innerHTML + 'soundtrack&appid=' + musicAPIkey)
  .then (function (response) {
    if (response.status === 404) {
      console.log('No soundtrack could be found')
    } else {
      return response.json()
    }
  })
  .then (function (data) {
    console.log(data)
    })
}

searchButton.addEventListener('click', searchResults)

var movieimage = json.parse('poster_path')
document.getElementById("result-image-clicked").innerHTML = movieimage;
// image to display in modal