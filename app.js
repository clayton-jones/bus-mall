'use strict';

// ======= global variables =======

var voteMaxEl = document.getElementById('vote-max');

var imgContainer = document.getElementById('img-container');
// var imgOne = document.getElementById('imgOne');
// var imgTwo = document.getElementById('imgTwo');
// var imgThree = document.getElementById('imgThree');
var chartContainer = document.getElementById('chartContainer');

var dataEl = document.getElementById('data');

var voteMax = 25;
var totalImages = 3;

var picArray = [];


var prevSetIndexes = [];

var namesArray = [];
var viewsArray = [];
var clicksArray = [];

// ======= end global variables =======


// ======= global functions =======

// picture constructor function
function Picture(src, name) {
  this.src = `./img/${src}.jpg`;
  this.name = name;
  this.viewed = 0;
  this.clicked = 0;
  this.prevSet = false;
  picArray.push(this);
}

// random function from MDN
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// creates picture objects which stores in picArray
function populatePictures() {
  new Picture('bag', 'R2D2 Luggage');
  new Picture('banana', 'Banana Slicer');
  new Picture('bathroom', 'Bathroom');
  new Picture('boots', 'Rain Boots');
  new Picture('breakfast', 'Breakfast Oven');
  new Picture('bubblegum', 'Meat Bubblegum');
  new Picture('chair', 'Red Chair');
  new Picture('cthulhu', 'Cthulhu Figurine');
  new Picture('dog-duck', 'Dog Duck');
  new Picture('dragon', 'Dragon Meat');
  new Picture('pen', 'Utensil Pen');
  new Picture('pet-sweep', 'Pet Sweep');
  new Picture('scissors', 'Pizza Scissors');
  new Picture('shark', 'Shark');
  new Picture('sweep', 'Baby Sweep');
  new Picture('tauntaun', 'Tauntaun');
  new Picture('unicorn', 'Unicorn Meat');
  new Picture('usb', 'USB');
  new Picture('water-can', 'Water Can');
  new Picture('wine-glass', 'Wine Glass');
}


// displays votes left to user
var showVotesLeft = () => { voteMaxEl.textContent = `Votes remaining: ${voteMax}`;
};


function createImgTags () {
  for (var i = 0; i < totalImages; i++) {
    var img = document.createElement('img');
    imgContainer.appendChild(img);
  }
}


function generatePics () {
  var imgElArray = document.getElementsByTagName('img');
  var indexArray = [];
  for (var i = 0; i < imgElArray.length; i++) {
    var index1 = randomIndex(picArray.length);

    while(indexArray.includes(index1) || prevSetIndexes.includes(index1)) {
      index1 = randomIndex(picArray.length);
    }
    indexArray.push(index1);

    imgElArray[i].src = picArray[index1].src;
    imgElArray[i].title = picArray[index1].name;
    imgElArray[i].alt = picArray[index1].name;
    picArray[index1].viewed++;
  }

  prevSetIndexes = indexArray;
}


function displayList() {
  var ulEl = document.createElement('ul');
  for (var i = 0; i < picArray.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${picArray[i].name} had ${picArray[i].clicked} votes and was shown ${picArray[i].viewed} times`;
    ulEl.appendChild(liEl);
  }
  dataEl.appendChild(ulEl);
}

function onPageLoad() {
  populatePictures();
  showVotesLeft();
  createImgTags();
  generatePics();

}

function show (elem) {
  elem.style.display = 'block';
}

function hide (elem) {
  elem.style.display = 'none';
}

function popDataArrays() {
  for (var i = 0; i < picArray.length; i++) {
    namesArray.push(picArray[i].name);
    viewsArray.push(picArray[i].viewed);
    clicksArray.push(picArray[i].clicked);
  }
}


// ======= end global functions =======


// ======= event listeners =======

imgContainer.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.src) {

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
      hide(imgContainer);
      popDataArrays();
      show(chartContainer);
      displayChart();
      hide(dataEl);
    }
  }
}

// ======= end event listeners =======


// ======= ChartJS =======


function displayChart () {
  Chart.defaults.global.animation.duration = 1600;
  Chart.defaults.global.animation.easing = 'easeOutCirc';
  Chart.defaults.global.defaultFontColor = 'rgb(245, 245, 245)';

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'rgb(76, 173, 252)',
        borderColor: 'rgb(76, 173, 252)',
        data: clicksArray
      },
      {
        label: 'Views',
        backgroundColor: 'rgb(245, 245, 245)',
        borderColor: 'rgb(245, 245, 245)',
        data: viewsArray
      }]
    },

    // Configuration options go here
    options: {
      legend: {
        position: 'bottom'
      },
      title: {
        text: 'Voting Results',
        display: true,
        fontSize: 18,
        padding: 30,
        fontColor: 'rgb(245, 245, 245)'
      }
    }
  });
}

onPageLoad();
