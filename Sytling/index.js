window.addEventListener('load', () => {
    const slide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const dots = document.querySelectorAll('.dot');
    const container = document.querySelector('.carousel-container');

    let counter = 0;
    const intervalTime = 5000;
    let slideInterval;

    function updateSlide() {
        if (!images.length || !images[0]) return;
        
        const size = images[0].clientWidth;
        slide.style.transform = `translateX(${-size * counter}px)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[counter]) {
            dots[counter].classList.add('active');
        }
    }

    function nextSlide() {
        counter++;
        if (counter >= images.length) {
            counter = 0;
        }
        updateSlide();
    }

    function startSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // --- GLOBALE FUNKTIONEN (Sichtbar für das HTML) ---

    window.currentSlide = function(index) {
        counter = index;
        updateSlide();
        startSlide();
    };

    // Jetzt hier drin, damit 'counter' und 'updateSlide' bekannt sind
    window.changeSlide = function(direction) {
        counter += direction;

        if (counter >= images.length) {
            counter = 0;
        }
        if (counter < 0) {
            counter = images.length - 1;
        }

        updateSlide();
        startSlide();
    };

    // --- EVENT LISTENER ---

    container.addEventListener('mouseenter', () => clearInterval(slideInterval));
    container.addEventListener('mouseleave', startSlide);

    // Initialisierung
    updateSlide();
    startSlide();

    window.addEventListener('resize', updateSlide);
});