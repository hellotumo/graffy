# Graffy

The main point of many opinion articles from The New York Times are buried at the bottom.

Rather than scrolling, I made a tool to reverse or randomize the order of the paragraphs.

You can read about the project here: https://hellotumo.com/2015/07/graffy-bookmarklet-gets-to-the-point-of-the-new-york-times-article/

In short, you make a bookmarklet with some JavaScript as the URL, and that calls up a .js file I made to reverse or randomize the paragraphs.

Here is the JavaScript you should use in the URL field of the bookmark you make: 

javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://graffy.hellotumo.com/graffy.js';})();

It is a bit old now, and may not work with as many sites as it did a few years ago. But as of June 2019, it works with opinion content from The New York Times.

