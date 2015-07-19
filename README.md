# graffy

The main point of many opinion articles from The New York Times are buried at the bottom.

Rather than scrolling, I made a tool to reverse the order of the paragraphs.

You can read about the project here: http://hellotumo.com/2015/07/06/graffy-bookmarklet-gets-to-the-point-of-the-new-york-times-article/

In short, you make a bookmarklet with some JavaScript as the URL, and that calls up a .js file I made to reverse or randomize the paragraphs.

Here is the JavaScript you should use in the URL field of the bookmark you make: 

javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://s3.amazonaws.com/tumo/jscripts/graffy/graffy.js';})();

It works for a number of sites, including The New York Times, the BBC, The Conversation and Quartz. I add sites when I have a chance; it involves looking at the HTML and determining the best way to find and collect all of the paragraph tags of an article.

