// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollableHeight = documentHeight - windowHeight;
  const scrollPercentage = (scrollTop / scrollableHeight) * 100;
  
  scrollProgress.style.width = scrollPercentage + '%';
}

// Efeito Parallax
const parallaxSections = document.querySelectorAll('.parallax-section');

function applyParallax() {
  parallaxSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    

    if (rect.top < windowHeight && rect.bottom > 0) {
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollPosition = window.pageYOffset;
      
      const centerY = windowHeight / 2;
      const sectionCenter = sectionTop + sectionHeight / 2;
      const distanceFromCenter = (sectionCenter - centerY) / windowHeight;
      
      const parallaxOffset = distanceFromCenter * 20;
      section.style.transform = `translateY(${parallaxOffset}px)`;
    }
  });
}

// Otimização de performance 
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      applyParallax();
      ticking = false;
    });
    ticking = true;
  }
}

// Event listeners
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => {
  updateScrollProgress();
  applyParallax();
});

// Inicializa no carregamento da página
window.addEventListener('load', () => {
  updateScrollProgress();
  applyParallax();
});

// Inicializa imediatamente
updateScrollProgress();
applyParallax();

