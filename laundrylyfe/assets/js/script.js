const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider img');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function updateSlider() {
  document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

// Initialize the slider position and set the initial indicator state
slider.style.transform = `translateX(${0}%)`;
updateSlider();

// Event listeners for mouse dragging (desktop)
slider.addEventListener('mousedown', function (e) {
  startX = e.clientX;
  isDragging = true;
  slider.style.transition = 'none'; // Disable smooth transition during dragging
});

slider.addEventListener('mousemove', function (e) {
  if (!isDragging) return;
  let moveX = e.clientX - startX;
  slider.style.transform = `translateX(${moveX - currentIndex * 100}%)`;
});

slider.addEventListener('mouseup', function (e) {
  isDragging = false;
  let endX = e.clientX;
  let diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      currentIndex++;
      if (currentIndex >= images.length) currentIndex = 0;
    } else {
      currentIndex--;
      if (currentIndex < 0) currentIndex = images.length - 1;
    }
  }

  slider.style.transition = 'transform 0.3s ease';
  slider.style.transform = `translateX(${-currentIndex * 100}%)`;
  updateSlider();
});

// Event listeners for touch events (mobile)
slider.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX;
  isDragging = true;
  slider.style.transition = 'none'; // Disable smooth transition during dragging
});

slider.addEventListener('touchmove', function (e) {
  if (!isDragging) return;
  let moveX = e.touches[0].clientX - startX;
  slider.style.transform = `translateX(${moveX - currentIndex * 100}%)`;
});

slider.addEventListener('touchend', function (e) {
  isDragging = false;
  let endX = e.changedTouches[0].clientX;
  let diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      currentIndex++;
      if (currentIndex >= images.length) currentIndex = 0;
    } else {
      currentIndex--;
      if (currentIndex < 0) currentIndex = images.length - 1;
    }
  }

  slider.style.transition = 'transform 0.3s ease';
  slider.style.transform = `translateX(${-currentIndex * 100}%)`;
  updateSlider();
});
