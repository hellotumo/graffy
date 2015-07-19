//  get url
var graffyHeadlineLink = window.location.href;

// sorting out the different ways to get text inside tags 

var textTypesArray = ['content', 'innerText', 'innerHTML', 'outerHTML', 'text', 'textContent', 'outerText'];

// https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll

var grafTypesArray = ['.story-body-text', 'div.entry-content > p', 'div.story-body__inner > p', 'div.item-body > div > p', 'div#parent-fieldname-text > p'];

// Array order: NYT, Conversation, BBC, Quartz, SFARI.org 

// * BODY CONTENT PARAGRAPHS 
// grabbing them with function 

var allGrafs = [];
// allGrafs = document.querySelectorAll(grafTypesArray[1]); // works
function getTheBodyGrafs (grafTypesArray) {
  for (var i=0; i < grafTypesArray.length; i++) {
     if (document.querySelector(grafTypesArray[i]) != null) {
      allGrafs = document.querySelectorAll(grafTypesArray[i]);
      console.log('the type is: ' + grafTypesArray[i]);
      console.log('TEST: ' + allGrafs);  
      return allGrafs;
    };
  };
};

getTheBodyGrafs(grafTypesArray);

// modified grafs Array make an array of all the <p> body elements in The NYT's article
var grafsArray = [];
function makeArray () {
  for (var i=allGrafs.length-1; i >= 0; i--) {
    grafsArray.push(allGrafs[i]);
  };
};
makeArray();
console.log(grafsArray[10] + ' ==> grafsArray[10]');


function grabRightAllGrafs2 (allGrafsTagNamesArray) {
  for (var i=0; i < allGrafsTagNamesArray.length; i++) {

    if (allGrafsTagNamesArray[i]) {
      for (var j=0; j < textTypesArray.length; j++) {
        if (allGrafsTagNamesArray[i][textTypesArray[j]] != undefined) {
          console.log(allGrafsTagNamesArray[i][textTypesArray[j]]);
          allGrafs = allGrafsTagNamesArray[i];
          return allGrafs;
        };
        
      };
    };
  };
};

// * HEADLINE 

// tracking down different ways the headline is classed or labeled
var headlineTagNamesArray = [document.querySelector('title'), document.querySelector('meta[name="hd1"]'), document.querySelector('meta[name="description"]'), document.querySelector('h1.documentFirstHeading')];

// NYT, Conversation, BBC?, SFARI.org 

var graffyHeadline2 = '';

function grabRightHeadline (headlineTagNamesArray) {
  for (var i=0; i < headlineTagNamesArray.length; i++) {
    //console.log(textTypesArray[0], ' < 0 | length > ',textTypesArray.length);
    if (headlineTagNamesArray[i]) {
      for (var j=0; j < textTypesArray.length; j++) {
        if (headlineTagNamesArray[i][textTypesArray[j]] != undefined) {
          graffyHeadline2 = headlineTagNamesArray[i][textTypesArray[j]];
          return graffyHeadline2;
        }
      }
      // graffyHeadline2 = headlineTagNamesArray[i].innerText;
      console.log('graffyHeadline2 is: ' + graffyHeadline2);
      // return graffyHeadline2;
    };
  };
};
grabRightHeadline(headlineTagNamesArray);

// * SUMMARY *
// tracking down different ways summary grafs are classed or labeled

var summaryTagNamesArray = [document.querySelector('meta[itemprop="description"]'), document.querySelector('meta[name="description"]'), document.querySelector('div#content-core p:nth-child(2)')];

//NYT, conversation/bbc/qz.com, sfari.org

var graffySummary = '';

function grabRightSummary (summaryTagNamesArray) {
  for (var i=0; i < summaryTagNamesArray.length; i++) {

    if (summaryTagNamesArray[i]) {
      for (var j=0; j < textTypesArray.length; j++) {
        console.log(summaryTagNamesArray[i][textTypesArray[j]]);
        if (summaryTagNamesArray[i][textTypesArray[j]] != undefined) {
          graffySummary = summaryTagNamesArray[i][textTypesArray[j]];
          return graffySummary;
        }
      }
      
    };
  };
};
grabRightSummary(summaryTagNamesArray);

// make a single variable containing all of the <p> tag content
var graffyBigBucket = '';
function graffyChurner() {
  for (var i=0; i < grafsArray.length; i++) {
    graffyBigBucket += '<p class="graffySingleItem">' + grafsArray[i].innerHTML + '</p>'; 
  };
};
graffyChurner();

// launch a new window and populate it with the <p> content along with some headline and link information
function graffyWindow2() {
  var graffyWindowTarget = window.open('');
  console.log('inside graffyWindow2 function, graffyHeadline 2 is: ' +graffyHeadline2);
  graffyWindowTarget.document.write('<html><head><title>' + 'Graffy pro reversomaticizer' + '</title></head><body>');
  console.log("XXXXXXXXX");
  graffyWindowTarget.document.write('<h2>' + 'Graffy it ==> ' + graffyHeadline2 + '</h2>');
  graffyWindowTarget.document.write('<h4>' + graffySummary + '</h4>');
  graffyWindowTarget.document.write('<p><a href="' + graffyHeadlineLink + '" target="_blank">' + 'Back to original article' + '</a>' + ' / <a href="http://hellotumo.com/2015/07/06/graffy-bookmarklet-gets-to-the-point-of-the-new-york-times-article/" target="_blank">About this tool</a></p>');
  
  graffyWindowTarget.document.write('<div id="graffyButtonContainer"></div>');
  graffyWindowTarget.document.write('<br>');
  graffyWindowTarget.document.write('<div id="graffyRandoButtonContainer"></div>');
  graffyWindowTarget.document.write('<br>');
  graffyWindowTarget.document.write('<div id="graffyContainer">');
  graffyWindowTarget.document.write(graffyBigBucket);
  graffyWindowTarget.document.write('</div>')
  graffyWindowTarget.document.write('</body></html>');
  graffyWindowTarget.document.body.appendChild(document.createElement('script')).src='https://s3.amazonaws.com/tumo/jscripts/graffy/graffyRereverse.js';
};
graffyWindow2();

