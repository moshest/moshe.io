"use strict";

(function testimonials() {
  var cntr = document.getElementById('quote-container');
  var quotes = document.getElementsByClassName('quote');
  var prev = document.getElementsByClassName('prev')[0];
  var next = document.getElementsByClassName('next')[0];

  var drag = null;
  cntr.addEventListener('mousedown', function(e) {
    if (!drag) {
      e.preventDefault();
    }

    drag = { s: cntr.scrollLeft, x: e.clientX };
  });

  cntr.addEventListener('mousemove', function(e) {
    if (!drag) return;

    cntr.scrollLeft = drag.s + drag.x - e.clientX;
  });

  document.addEventListener('mouseup', function(e) {
    if (!drag) return;

    e.preventDefault();
    drag = null;
  });

  next.addEventListener('click', function() {
    var n = quotes.length;
    var w = cntr.scrollWidth;
    var p = w / n;

    cntr.scrollTo({
      left: cntr.scrollLeft + 2 * p,
      behavior: 'smooth'
    });
  });

  prev.addEventListener('click', function() {
    var n = quotes.length;
    var w = cntr.scrollWidth;
    var p = w / n;

    cntr.scrollTo({
      left: cntr.scrollLeft - 2 * p,
      behavior: 'smooth'
    });
  });
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

(function tracking() {
  var links = document.getElementsByTagName('A');

  function track() {
    analytics.track(this.getAttribute('title') || this.innerText, {
      content: this.innerText,
      location: this.href
    });
  }

  for (var i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', track);
    links[i].addEventListener('contextmenu', track);
  }
})();
