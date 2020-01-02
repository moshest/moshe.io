"use strict";

(function testimonials() {
  var cntr = document.getElementById('quote-container');
  var quotes = document.getElementsByClassName('quote');
  var prev = document.getElementsByClassName('prev')[0];
  var next = document.getElementsByClassName('next')[0];
  var timer = null;

  function unbindScroll() {
    timer && clearTimeout(timer);
    cntr.removeEventListener('scroll', onScroll);

    timer = setTimeout(function () {
      timer = null;
      cntr.addEventListener('scroll', onScroll);
    }, 2000);
  }

  function onScroll() {
    unbindScroll();

    const event = 'Testimonials Scrolled';
    analytics.track(event, {
      event: event,
      location: this.href
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    cntr.addEventListener('scroll', onScroll);
  });

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

    unbindScroll();

    cntr.scrollTo({
      left: cntr.scrollLeft + 2 * p,
      behavior: 'smooth'
    });
  });

  prev.addEventListener('click', function() {
    var n = quotes.length;
    var w = cntr.scrollWidth;
    var p = w / n;

    unbindScroll();

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
  function track() {
    var event = this.getAttribute('title') || this.innerText;

    analytics.track(event, {
      event: event,
      content: this.innerText,
      location: this.href
    });
  }

  var i;

  var links = document.getElementsByTagName('A');
  for (i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', track);
    links[i].addEventListener('contextmenu', track);
  }

  var buttons = document.getElementsByTagName('BUTTON');
  for (i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', track);
  }
})();


(function share() {
  if (!navigator.share) return;

  var link = document.getElementById('share-a-friend');

  link.addEventListener('click', function(e) {
    e.preventDefault();

    navigator.share({
      title: 'Moshe.io',
      text: 'Checkout Moshe Simantov profile',
      url: 'https://moshe.io',
    })
  });
  link.href = '/';
})();
