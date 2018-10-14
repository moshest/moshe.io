"use strict";

(function switchQuotes() {
  var quotes = document.getElementsByClassName('quote');
  var shuffled = [];
  var currQuote = 0;
  var i, j, x;

  for (i = 0; i < quotes.length; i += 1) {
    shuffled.push(quotes[i]);
  }
  quotes[0].classList.remove('active');

  for (i = shuffled.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));

    x = shuffled[j];
    shuffled[j] = shuffled[i];
    shuffled[i] = x;
  }

  function switchQuotes() {
    var oldIndex = currQuote;
    currQuote += 1;
    if (currQuote >= shuffled.length) {
      currQuote = 0;
    }

    shuffled[oldIndex].classList.remove('active');
    shuffled[currQuote].classList.add('active');

    var innerText = shuffled[currQuote].innerText;
    var nextTime = innerText ? innerText.length * 50 + 4e3 : 10e3;

    setTimeout(switchQuotes, nextTime);
  }

  switchQuotes();
})();

(function yearsUpdater() {
  var years = document.getElementsByClassName('years');
  var yearNow = (new Date()).getFullYear();

  for (var i = 0; i < years.length; i += 1) {
    var elm = years[i];
    var since = parseInt(elm.getAttribute('data-since'), 10);

    elm.innerHTML = String(yearNow - since);
  }
})();
