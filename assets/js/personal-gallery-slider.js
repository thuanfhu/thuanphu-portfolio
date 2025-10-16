// Initialize Swiper for the personal gallery section
const swiper = new Swiper('.gallery__swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  initialSlide: 1, // Set the second slide as the initial one
  loop: false, // Do not loop as requested
  slidesPerView: 'auto',
  watchSlidesProgress: true, // Fix: Ensure slide progress is always tracked
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.gallery__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});