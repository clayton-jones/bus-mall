'use strict';

// ======= global variables =======
// var imgContainer = document.getElementById('img-container');

var picArray = [];

function Picture(src, name) {
  this.src = `./images/${src}.jpg`;
  this.name = name;
  this.viewed = 0;
  this.clicked = 0;
  picArray.push(this);
}

function generatePics() {
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

generatePics();

console.table(picArray);

// imgContainer.addEventListener('click', handleClick);

// function handleClick(event) {

// }
