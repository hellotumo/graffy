// grab all the <p> tags containing the content
var freshGraffyArray = document.getElementsByClassName('graffySingleItem');

//convert that to an actual array we can play with in terms of reversing 
var freshGraffyArrayB = [];
for (var i=0; i < freshGraffyArray.length; i++) {
  freshGraffyArrayB.push(freshGraffyArray[i]);
};

// button for randomizer
var randoButton = document.createElement('button');
var randoButtonText = document.createTextNode('Randomize');
randoButton.appendChild(randoButtonText);
document.querySelector('#graffyRandoButtonContainer').appendChild(randoButton);
var theRandoButton = document.querySelector('#graffyRandoButtonContainer button');

//randomizer tool

function simpleRandomValueGenerator (lengthVal) {
  return Math.floor(Math.random() * lengthVal);
};

// randomizer items 

var randoBigBucket = '';
var randoFreshArraySource =[];
var randoFreshArrayActive = [];
var tempCalcValue;
var frozenArrayLength;
var frozenArrayLengthCalcValue;

function randoFillBucket () {
  
  // grab all the <p> tags (they have a class of graffySingleItem)
  randoFreshArraySource = document.querySelectorAll('.graffySingleItem');

  // push all those <p> tags into a fresh array 
  for (var i=0; i < randoFreshArraySource.length; i++) {
    randoFreshArrayActive.push(randoFreshArraySource[i]);
  }

  // clear the <div> container of current <p> tags to prep for new load 
  document.querySelector('#graffyContainer').innerHTML = '';

  // get the length of our array before we start manipulating it - we can't dynamically calculate its length because we're removing items from it, and this would cause a flaw in the logic of looping through the entire thing. (We would stop when the i value, which is increasing, reaches the decereasing array length value)
  frozenArrayLength = randoFreshArrayActive.length;

  // Grab the active array's length again so we can have a value that does not change. 
  frozenArrayLengthCalcValue = randoFreshArrayActive.length; //we do this because we need stricter control over the number we use to calculate a random number.

  // We must clear out our container in which we put all of the <p> tags. If we don't, we'll get erroneous repetition.   
  randoBigBucket = '';

  for (var i=0; i < frozenArrayLength; i++) {
    tempCalcValue = simpleRandomValueGenerator(frozenArrayLengthCalcValue);
    randoBigBucket += '<p class="graffySingleItem">' + randoFreshArrayActive[tempCalcValue].innerHTML + '</p>';
    randoFreshArrayActive.splice(tempCalcValue,1);
    frozenArrayLengthCalcValue--;
  };
  
  // At the end of the loop, populate our container with the newly order collection of <p> tags 
  document.querySelector('#graffyContainer').innerHTML = randoBigBucket;
}

// click event runs the randomizer function 
theRandoButton.onclick = randoFillBucket;

/* end of the randomizer code */

/* reversing tool below. It always operates off the initial order of the article. */ 

// button for rereverse
var redoButton = document.createElement('button');
var redoButtonText = document.createTextNode('Rereverse');
redoButton.appendChild(redoButtonText);
document.querySelector('#graffyButtonContainer').appendChild(redoButton);
var theButton = document.querySelector('button');

// clean the page, reverse the order of paragraphs, clean our container of <p> tags, and put them into the page
function rereverse() {
  document.querySelector('#graffyContainer').innerHTML = '';
  freshGraffyArrayB.reverse();
  var bigBucket2 = '';
  for (var i=0; i < freshGraffyArrayB.length; i++) {
    bigBucket2 += '<p class="graffySingleItem">' + freshGraffyArrayB[i].innerHTML + '</p>'; 
  };
  document.querySelector('#graffyContainer').innerHTML = bigBucket2;
}

// click event runs the rereverse function 
theButton.onclick = rereverse;