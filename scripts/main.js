"use strict";

/* switch quotes */

var quotes = document.getElementsByClassName('quote');
var currQuote = 0;

function switchQuotes(firstTime) {
  var oldIndex = currQuote;
  
  do {
    currQuote = Math.floor(Math.random() * quotes.length);
  } while (currQuote === oldIndex && !firstTime);

  quotes[oldIndex].classList.remove('active');
  quotes[currQuote].classList.add('active');

  var innerText = quotes[currQuote].innerText;
  var nextTime = innerText ? innerText.length * 50 + 4e3 : 10e3;

  setTimeout(switchQuotes, nextTime);
}

switchQuotes(true);
