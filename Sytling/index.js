const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Counter
let counter = 0;
const size = carouselImages[0].clientWidth;

// Event Listener für "Weiter"
nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) {
    counter = -1; // Springt zurück zum Anfang, wenn das Ende erreicht ist
  }
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

// Event Listener für "Zurück"
prevBtn.addEventListener('click', () => {
  if (counter <= 0) {
    counter = carouselImages.length; // Springt zum Ende, wenn man am Anfang zurück klickt
  }
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});