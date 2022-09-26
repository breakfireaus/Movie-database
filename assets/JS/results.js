// global variables



var searchButton = document.querySelector('#search-button')



// APIs



var musicAPIkey = '327d3bf7241329fd83a0889ff32d9943'

//previous search history appears on page and persistent(local storage)
// function
// search bar 
// and button to save to local storage
// retrieve from local Storage
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


// end of modal script 

//obtain music tracks


searchButton.addEventListener('click', searchResults)

function searchResults(e) {
  e.preventDefault()
  var searchInput = document.querySelector('input[name="movie-search"]')
  var searchInputVal = searchInput.value;
  var movieAPIkey = 'https://api.themoviedb.org/3/search/movie?api_key=f773dd7be92f1943bb6b98b40e74c3bf&query=' + searchInputVal + '&total_results=5';
   
    fetch(movieAPIkey)
    .then(function (response) {
      console.log(response);
      return response.json();
    }) 
    .then(function (data) {
      console.log(data);
      for (var i=0; i < data.results.length; i++) {
        var resultsCard = document.createElement('button');
        resultsCard.addEventListener('click', resultsModalDisplay);
        resultsCard.textContent = data.results[i].original_title + ', ' + data.results[i].release_date;
        document.querySelector('#results').append(resultsCard)
      }

      function resultsModalDisplay() {
        modal.style.display = 'block';
        var modalTitle = document.querySelector('#movie-title-filled')
        var modalImage = document.querySelector('#image')
        if (data.results[i].original_title === resultsCard.textContent) {
          modalTitle.textContent = data.results[i].original_title;
          modalImage.src = data.results[i].poster_path;
        }
      }

    });
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
    var searchID = data.id

    fetch('https://api.deezer.com/album/' + searchID)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.tracks.length; i++) {
        var albumTrack = document.createElement(li)
        albumTrack[i].textContent = data.tracks[i].title + ' by ' + data.tracks[i].artist.name 
        albumTrack.append(document.querySelector('#music-list'))
      }
    })
  })
}




// image to display in modal