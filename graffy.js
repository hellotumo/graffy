//  get url of the article we're reading
var graffyHeadlineLink = window.location.href;

// sorting out the different ways to get text inside tags. I throw everything at it because I wasn't able to find one reliable method.

var textTypesArray = ['content', 'innerText', 'innerHTML', 'outerHTML', 'text', 'textContent', 'outerText'];

// below is the array containing the class names that work in conjunction with querySelector and querySelectorAll in the getTheBodyGrafs function

var grafTypesArray = ['.story-body-text', 'div.entry-content > p', 'div.story-body__inner > p', 'div.item-body > div > p', 'div#parent-fieldname-text > p'];

/* ###
grafTypesArray order: 
 * 0 NYT
 * 1 The Conversation (one of many classes of the div containing all the <p> tags)
 * 2 BBC
 * 3 Quartz
 * 4 SFARI.org
#### */  

// * ### GRABBING THE BODY CONTENT PARAGRAPHS 

var allGrafs = [];
function getTheBodyGrafs (grafTypesArray) {
  for (var i=0; i < grafTypesArray.length; i++) {
     if (document.querySelector(grafTypesArray[i]) != null) {
      allGrafs = document.querySelectorAll(grafTypesArray[i]);
      return allGrafs;
    };
  };
};

getTheBodyGrafs(grafTypesArray);

// modified allGrafs array to make a malleable array of all the <p> body elements in the article
var grafsArray = [];
function makeArray () {
  for (var i=allGrafs.length-1; i >= 0; i--) {
    grafsArray.push(allGrafs[i]);
  };
};
makeArray();

/* ### GRABBING THE HEADLINE */

// an array of the different ways different publications tag/class/etc their headlines

var headlineTagNamesArray = [document.querySelector('title'), document.querySelector('meta[name="hd1"]'), document.querySelector('meta[name="description"]'), document.querySelector('h1.documentFirstHeading')];

/* ###
headlineTagNamesArray order: 
 * 0 NYT (and many others)
 * 1 I'm not really sure where I got [name="hd1"]
 * 2 Very common 
 * 3 SFARI.org
#### */ 

var graffyHeadline2 = '';

function grabRightHeadline (headlineTagNamesArray) {
  for (var i=0; i < headlineTagNamesArray.length; i++) {
    if (headlineTagNamesArray[i]) {
      for (var j=0; j < textTypesArray.length; j++) {
        if (headlineTagNamesArray[i][textTypesArray[j]] != undefined) {
          graffyHeadline2 = headlineTagNamesArray[i][textTypesArray[j]];
          return graffyHeadline2;
        };
      };
    };
  };
};

grabRightHeadline(headlineTagNamesArray);

// ## GRABBING SUMMARY TEXT ### 
// tracking down different ways summary grafs are classed or labeled

var summaryTagNamesArray = [document.querySelector('meta[itemprop="description"]'), document.querySelector('meta[name="description"]'), document.querySelector('div#content-core p:nth-child(2)')];

/* summaryTagNamesArray order: 
 * 0 NYT - itemprop="description"
 * 1 Very common - name="description"
 * 2 SFARI.org - actually grabbing the 2nd <p> tag within div, which usually is first graf, which offers good summary of the content
*/ 

// Let's make the summary 

var graffySummary = '';

function grabRightSummary (summaryTagNamesArray) {
  for (var i=0; i < summaryTagNamesArray.length; i++) {
    if (summaryTagNamesArray[i]) {
      for (var j=0; j < textTypesArray.length; j++) {
        if (summaryTagNamesArray[i][textTypesArray[j]] != undefined) {
          graffySummary = summaryTagNamesArray[i][textTypesArray[j]];
          return graffySummary;
        };
      };
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
  graffyWindowTarget.document.write('<html><head><title>' + 'Graffy pro reversomaticizer' + '</title></head><body>');
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