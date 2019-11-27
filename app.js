'use strict';

// ======= global variables =======

var voteMaxEl = document.getElementById('vote-max');
var imgContainer = document.getElementById('img-container');
var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');

var voteMax = 25;

var picArray = [];

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
  var index1 = randomIndex(picArray.length);

  imgOne.src = picArray[index1].src;
  imgOne.title = picArray[index1].name;
  imgOne.alt = picArray[index1].name;
  picArray[index1].viewed++;

  var index2 = randomIndex(picArray.length);
  while (index2 === index1) {
    index2 = randomIndex(picArray.length);
  }

  imgTwo.src = picArray[index2].src;
  imgTwo.title = picArray[index2].name;
  imgTwo.alt = picArray[index2].name;
  picArray[index2].viewed++;

  var index3 = randomIndex(picArray.length);
  while (index3 === index1 || index3 === index2) {
    index3 = randomIndex(picArray.length);
  }

  imgThree.src = picArray[index3].src;
  imgThree.title = picArray[index3].name;
  imgThree.alt = picArray[index3].name;
  picArray[index3].viewed++;
}

generatePics();

// ======= end global functions =======



// ======= event listeners =======

imgContainer.addEventListener('click', handleClick);

function handleClick(event) {
  if (voteMax > 0) {
    voteMax--;
    showVotesLeft();
    var vote = event.target.title;
    console.log('You voted for: ', vote);
    for (var i = 0; i < picArray.length; i++) {
      if (vote === picArray[i].name) {
        // console.log(picArray[i]);
        picArray[i].clicked++;
      }
    }
    console.table(picArray);
    generatePics();
  }
}

// ======= end event listeners =======

