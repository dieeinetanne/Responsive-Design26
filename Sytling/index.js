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

/*-----Zoom map-----*/
window.addEventListener('load', () => {
  const titelSection = document.querySelector('.titel');

  // Warte 2000 Millisekunden (2 Sekunden)
  setTimeout(() => {
    if (titelSection) {
      titelSection.classList.add('zoom-active');
    }
  }, 2000);
});
/*------Einleitung------*/
window.addEventListener('scroll', () => {
  const einleitung = document.querySelector('.einleitung');
  const threshold = window.innerHeight * 0.4; // Ab 40% der ersten Seite ausblenden

  if (window.scrollY > threshold) {
    // Wir fügen die Klasse hinzu, wenn wir weit genug unten sind
    einleitung.classList.add('scrolled-past');
  } else {
    // Wir entfernen sie wieder, wenn man ganz nach oben scrollt
    einleitung.classList.remove('scrolled-past');
  }
});

/*-----Polaroids-----*/

window.addEventListener('load', () => {
    // 1. Die Polaroids auswählen
    const polaroids = document.querySelectorAll('.polaroidseinzel');
    
    // 2. Den Beobachter einrichten
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // BEIM RUNTERSCROLLEN: Nacheinander erscheinen lassen
                polaroids.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('reveal');
                    }, index * 300); // 300ms Zeitabstand zwischen den Bildern
                });
            } else {
                // BEIM HOCHSCROLLEN: Wieder nach unten verschwinden lassen
                polaroids.forEach((el) => {
                    el.classList.remove('reveal');
                });
            }
        });
    }, { threshold: 0.1 }); // Startet sobald 10% der Sektion sichtbar sind

    // 3. Den Bereich "History" beobachten
    const historySection = document.querySelector('.history');
    if (historySection) {
        observer.observe(historySection);
    }
});