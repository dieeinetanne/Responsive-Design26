window.addEventListener('load', () => {
    const slide = document.querySelector('.carousel-slide');
    let images = document.querySelectorAll('.carousel-slide img');
    const dots = document.querySelectorAll('.dot');
    const container = document.querySelector('.carousel-container');

    if (!images.length) return;

    // 1. Klone erstellen (Anfang und Ende)
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);
    
    // IDs vergeben, damit wir sie später eindeutig identifizieren können
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    slide.appendChild(firstClone);
    slide.prepend(lastClone);

    // Bilder-Liste neu laden (jetzt +2 Bilder)
    const allImages = document.querySelectorAll('.carousel-slide img');
    let counter = 1; // Wir starten beim ersten "echten" Bild
    const intervalTime = 5000;
    let slideInterval;

    // Initialisierung der Position ohne Animation
    const size = images[0].clientWidth;
    slide.style.transform = `translateX(${-size * counter}px)`;

    function updateSlide() {
        const currentSize = allImages[0].clientWidth;
        slide.style.transition = "transform 0.5s ease-in-out";
        slide.style.transform = `translateX(${-currentSize * counter}px)`;
        
        // Dots Logik
        updateDots();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        let dotIndex = counter - 1;
        if (counter >= allImages.length - 1) dotIndex = 0;
        if (counter <= 0) dotIndex = dots.length - 1;
        if (dots[dotIndex]) dots[dotIndex].classList.add('active');
    }

    // DER TRICK: Wenn die Animation fertig ist, prüfen wir auf Klone
    slide.addEventListener('transitionend', () => {
        if (allImages[counter].id === 'first-clone') {
            slide.style.transition = "none"; // Animation kurz aus
            counter = 1; // Springe zum echten ersten Bild
            const currentSize = allImages[0].clientWidth;
            slide.style.transform = `translateX(${-currentSize * counter}px)`;
        }
        if (allImages[counter].id === 'last-clone') {
            slide.style.transition = "none";
            counter = allImages.length - 2; // Springe zum echten letzten Bild
            const currentSize = allImages[0].clientWidth;
            slide.style.transform = `translateX(${-currentSize * counter}px)`;
        }
    });

    function nextSlide() {
        if (counter >= allImages.length - 1) return;
        counter++;
        updateSlide();
    }

    function prevSlide() {
        if (counter <= 0) return;
        counter--;
        updateSlide();
    }

    // Globale Funktionen für HTML-Buttons
    window.changeSlide = function(direction) {
        if (direction === 1) nextSlide();
        else prevSlide();
        startSlide();
    };

    window.currentSlide = function(index) {
        counter = index + 1;
        updateSlide();
        startSlide();
    };

    function startSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    container.addEventListener('mouseenter', () => clearInterval(slideInterval));
    container.addEventListener('mouseleave', startSlide);
    window.addEventListener('resize', () => {
        slide.style.transition = "none";
        const currentSize = allImages[0].clientWidth;
        slide.style.transform = `translateX(${-currentSize * counter}px)`;
    });

    startSlide();
    updateDots();
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

document.addEventListener("DOMContentLoaded", () => {
  const topButton = document.getElementById("back-to-top");

  // Prüfen, ob der Button im HTML vorhanden ist
  if (topButton) {
    
    // 1. Die Klick-Logik (Das hat gefehlt!)
    topButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    // 2. Die Scroll-Logik (Ein- und Ausblenden)
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        topButton.classList.add("is-visible");
      } else {
        topButton.classList.remove("is-visible");
      }
    });
    
  }
});

window.addEventListener('load', () => {
    const listItems = document.querySelectorAll('.kundbtext ul li');
    
    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Nacheinander einblenden (Staging)
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('reveal');
                    }, index * 400); // 400ms Verzögerung zwischen jedem Punkt
                });
            } else {
                // Optional: Beim Hochscrollen wieder zurücksetzen
                listItems.forEach((item) => {
                    item.classList.remove('reveal');
                });
            }
        });
    }, { threshold: 0.3}); // Startet, wenn 30% der Liste sichtbar sind

    const kundbSection = document.querySelector('.kundb');
    if (kundbSection) {
        listObserver.observe(kundbSection);
    }
});