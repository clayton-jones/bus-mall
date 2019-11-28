'use strict';

// ======= global variables =======

var voteMaxEl = document.getElementById('vote-max');

var imgContainer = document.getElementById('img-container');
// var imgOne = document.getElementById('imgOne');
// var imgTwo = document.getElementById('imgTwo');
// var imgThree = document.getElementById('imgThree');


var dataEl = document.getElementById('data');

var voteMax = 25;

var picArray = [];

var totalImages = 3;

// ======= end global variables =======


// ======= global functions =======

// picture constructor function
function Picture(src, name) {
  this.src = `./img/${src}.jpg`;
  this.name = name;
  this.viewed = 0;
  this.clicked = 0;
  picArray.push(this);
}

// random function from MDN
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// creates picture objects which stores in picArray
function populateArray() {
  new Picture('bag', 'Bag');
  new Picture('banana', 'Banana');
  new Picture('bathroom', 'Bathroom');
  new Picture('boots', 'Boots');
  new Picture('breakfast', 'Breakfast');
  new Picture('bubblegum', 'Bubblegum');
  new Picture('chair', 'Chair');
  new Picture('cthulhu', 'Cthulhu');
  new Picture('dog-duck', 'Dog Duck');
  new Picture('dragon', 'Dragon');
  new Picture('pen', 'Pen');
  new Picture('pet-sweep', 'Pet Sweep');
  new Picture('scissors', 'Scissors');
  new Picture('shark', 'Shark');
  new Picture('sweep', 'Sweep');
  new Picture('tauntaun', 'Tauntaun');
  new Picture('unicorn', 'Unicorn');
  new Picture('usb', 'USB');
  new Picture('water-can', 'Water Can');
  new Picture('wine-glass', 'Wine Glass');
}

populateArray();

// displays votes left to user
var showVotesLeft = () => { voteMaxEl.textContent = `Votes remaining: ${voteMax}`;
};

showVotesLeft();

function generatePics () {
  removeImages();

  var indexArray = [];
  for (var j = 0; j < totalImages; j++) {
    var index1 = randomIndex(picArray.length);

    while(indexArray.includes(index1)) {
      index1 = randomIndex(picArray.length);
    }
    indexArray.push(index1);

    var img = document.createElement('img');

    img.src = picArray[index1].src;
    img.title = picArray[index1].name;
    img.alt = picArray[index1].name;
    picArray[index1].viewed++;
    imgContainer.appendChild(img);
  }
}

generatePics();

function displayList() {
  var ulEl = document.createElement('ul');
  for (var i = 0; i < picArray.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${picArray[i].name} had ${picArray[i].clicked} votes and was shown ${picArray[i].viewed} times`;
    ulEl.appendChild(liEl);
  }
  dataEl.appendChild(ulEl);
}

function removeImages() {
  var imageToRemove = imgContainer.lastChild;
  while (imageToRemove !== null) {
    imageToRemove.remove();
    imageToRemove = imgContainer.lastChild;
  }
}


// ======= end global functions =======



// ======= event listeners =======

imgContainer.addEventListener('click', handleClick);

function handleClick(event) {
  if (typeof event.target.src !== 'undefined') {

    voteMax--;
    showVotesLeft();
    if (voteMax > 0) {
      var vote = event.target.title;
      for (var i = 0; i < picArray.length; i++) {
        if (vote === picArray[i].name) {
          picArray[i].clicked++;
        }
      }
      generatePics();
    } else {
      imgContainer.removeEventListener('click', handleClick);
      displayList();
      removeImages();
    }
  }
}

// ======= end event listeners =======
