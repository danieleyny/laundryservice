'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const showElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", showElemOnScroll);







/**
 * Product Filter
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterBox = document.querySelector("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  filterBox.setAttribute("data-filter", this.dataset.filterBtn)
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", filter);
});

document.addEventListener('DOMContentLoaded', function() {

  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(function(card) {

    const slider = card.querySelector('.image-slider');
    const images = slider.querySelectorAll('img');
    const indicatorsContainer = card.querySelector('.image-indicators');

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // Dynamically generate indicators
    images.forEach(function(_, index) {
      const indicator = document.createElement('span');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicatorsContainer.appendChild(indicator);
    });

    const indicators = indicatorsContainer.querySelectorAll('.indicator');

    // Update Slider Function
    function updateSlider(direction = 'next') {
      slider.style.transition = 'transform 0.3s ease';
      slider.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';

      indicators.forEach(function(indicator, index) {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    // Touch Events for Mobile
    slider.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
    });

    slider.addEventListener('touchend', function(e) {
      isDragging = false;
      let endX = e.changedTouches[0].clientX;
      let diffX = startX - endX;

      if (Math.abs(diffX) > 50) { // Swipe threshold
        if (diffX > 0) {
          // Swiped left
          currentIndex++;
          if (currentIndex >= images.length) {
            currentIndex = 0;
          }
        } else {
          // Swiped right
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = images.length - 1;
          }
        }
        updateSlider();
      }
    });

    // Mouse Events for Desktop
    slider.addEventListener('mousedown', function(e) {
      startX = e.clientX;
      isDragging = true;
    });

    slider.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
    });

    slider.addEventListener('mouseup', function(e) {
      isDragging = false;
      let endX = e.clientX;
      let diffX = startX - endX;

      if (Math.abs(diffX) > 50) { // Swipe threshold
        if (diffX > 0) {
          // Swiped left
          currentIndex++;
          if (currentIndex >= images.length) {
            currentIndex = 0;
          }
        } else {
          // Swiped right
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = images.length - 1;
          }
        }
        updateSlider();
      }
    });

    // Click Events for Indicators
    indicators.forEach(function(indicator, index) {
      indicator.addEventListener('click', function() {
        currentIndex = index;
        updateSlider();
      });
    });

    // Prevent default dragging of images
    slider.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });

  });

});