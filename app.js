'use strict';

// ======= global variables =======

// container locations
var voteMaxEl = document.getElementById('vote-max');
var imgContainer = document.getElementById('img-container');
var chartContainer = document.getElementById('chartContainer');
var buttonContainer = document.getElementById('buttons');
var clearDataButton = document.getElementById('clear');
var voteAgainButton = document.getElementById('vote-again');
var dataContainer = document.getElementById('data');

// determines votes
var voteMax = 25;

// determines how many pictures are displayed. breaks if > 20
var totalImages = 3;

// to store pictuer objects
var picArray = [];

// for testing duplicate pictures from last set
var prevSetIndexes = [];

// data for chart
var namesArray = [];
var viewsArray = [];
var clicksArray = [];

// ======= end global variables =======


// ======= event listeners =======

imgContainer.addEventListener('click', handleClick);
voteAgainButton.addEventListener('click', voteAgain);
clearDataButton.addEventListener('click', clearData);

// ======= end event listeners =======


// picture constructor function
function Picture(src, name) {
  this.src = `./img/${src}.jpg`;
  this.name = name;
  this.viewed = 0;
  this.clicked = 0;
  this.prevSet = false;
  picArray.push(this);
}

// ======= Helper Functions =======

// random function from MDN
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function show (elem) {
  elem.style.display = 'block';
}

function hide (elem) {
  elem.style.display = 'none';
}

function removeById (id) {
  document.getElementById(id).remove();
}

// ======= End Helper Functions =======

// ======= Core Functions =======

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

// creates img tags
function createImgTags () {
  if (document.getElementsByTagName('img').length === 0) {
    for (var i = 0; i < totalImages; i++) {
      var img = document.createElement('img');
      imgContainer.appendChild(img);
    }
  }
}

// adds pictures to img tags
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

// everthing I want to happen on page load/refresh
function onPageLoad() {
  if (localStorage.getItem('pictures')) {
    picArray = JSON.parse(localStorage.getItem('pictures'));
  } else if (picArray.length === 0) {
    populatePictures();
  }
  hide(chartContainer);
  show(imgContainer);
  showVotesLeft();
  createImgTags();
  generatePics();
}

// stores data to localStorage
function storeData() {
  var stringifyArray = JSON.stringify(picArray);
  localStorage.setItem('pictures', stringifyArray);
}

// adds picture data to three seperate arrays
function popDataArrays() {
  for (var i = 0; i < picArray.length; i++) {
    namesArray.push(picArray[i].name);
    viewsArray.push(picArray[i].viewed);
    clicksArray.push(picArray[i].clicked);
  }
}

// clears the three data arrays to prep for re-population
function emptyDataArrays() {
  namesArray = [];
  viewsArray = [];
  clicksArray = [];
}

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
      hide(dataContainer);
      hide(imgContainer);
      popDataArrays();
      show(chartContainer);
      displayChart();
      show(buttonContainer);
      storeData();
    }
  }
}

// ======= end core functions =======


// ======= button functions =======

function clearData() {
  if (localStorage.getItem('pictures')) {
    localStorage.removeItem('pictures');
    console.log('Data Cleared');
    picArray = [];
  }
}

function voteAgain() {
  emptyDataArrays();
  hide(chartContainer);
  removeById('myChart');
  hide(buttonContainer);
  show(imgContainer);
  voteMax = 25;
  show(dataContainer);
  onPageLoad();
}

// ======= end button functions =======


// ======= ChartJS =======

function displayChart () {
  var canvasEl = document.createElement('canvas');
  canvasEl.id = 'myChart';
  chartContainer.appendChild(canvasEl);

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
