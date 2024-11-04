let currentSlide = 0;

function moveSlide(direction) {
  const carouselContainer = document.querySelector('.carousel-container');
  const totalSlides = document.querySelectorAll('.carousel-item').length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  const offset = -currentSlide * 100;
  carouselContainer.style.transform = `translateX(${offset}%)`;
}

// Función para cambiar automáticamente de slide
function startAutoSlide() {
  setInterval(() => {
    moveSlide(1); // Cambia automáticamente al siguiente slide
  }, 3000); // Cambia de imagen cada 3 segundos (3000 ms)
}

// Inicia el carrusel automático cuando la página se carga
window.onload = startAutoSlide;
