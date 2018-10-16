"use strict";

(function switchQuotes() {
  var quotes = document.getElementsByClassName('quote');
  var dots = document.getElementsByClassName('marker-dot');
  var shuffled = [];
  var currQuote = quotes.length - 1;
  var nextQuote = 0;
  var nextTimeout = null;
  var i, j, x;

  for (i = 0; i < quotes.length; i += 1) {
    shuffled.push(quotes[i]);
    (function(i) {
      dots[i].addEventListener('click', function () {
        clearTimeout(nextTimeout);

        nextQuote = i;
        switchQuotes();
      });
    })(i);
  }
  quotes[0].classList.remove('active');
  dots[0].classList.remove('active');

  for (i = shuffled.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));

    x = shuffled[j];
    shuffled[j] = shuffled[i];
    shuffled[i] = x;
  }

  function switchQuotes() {
    var oldIndex = currQuote;
    currQuote = nextQuote;

    nextQuote += 1;
    if (nextQuote >= shuffled.length) {
      nextQuote = 0;
    }

    shuffled[oldIndex].classList.remove('active');
    shuffled[currQuote].classList.add('active');

    dots[oldIndex].classList.remove('active');
    dots[currQuote].classList.add('active');

    var innerText = shuffled[currQuote].innerText;
    var nextTime = innerText ? innerText.length * 50 + 4e3 : 10e3;

    nextTimeout = setTimeout(switchQuotes, nextTime);
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
