document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#hobbies");
  if (!section) return;

  const carousel = section.querySelector(".carousel");
  const list = section.querySelector(".carousel__list");
  const nextBtn = section.querySelector(".carousel__btn--next");
  const prevBtn = section.querySelector(".carousel__btn--prev");
  const arrowsWrap = section.querySelector(".carousel__arrows");
  const progressBar = section.querySelector(".carousel__progress-bar");
  const timeRunningBar = section.querySelector(".carousel__time-running");
  const items = Array.from(section.querySelectorAll(".carousel__item"));

  if (!carousel || !list || !nextBtn || !prevBtn || !arrowsWrap || !progressBar || items.length === 0) return;

  const TIME_RUNNING = 1500;
  let transitionTimeout;

  items.forEach((item, index) => {
    const titleEl = item.querySelector(".carousel__title");
    if (titleEl) titleEl.setAttribute("data-item", index + 1);
  });

  const handleSliderNavigation = (direction) => {
    const sliderItems = list.querySelectorAll(".carousel__item");
    if (direction === "next") {
      list.appendChild(sliderItems[0]);
      carousel.classList.add("next");
    } else if (direction === "prev") {
      list.prepend(sliderItems[sliderItems.length - 1]);
      carousel.classList.add("prev");
    }
    updateSlideMeta();
    resetCarouselState();
  };

  const updateSlideMeta = () => {
    const existing = arrowsWrap.querySelector(".carousel__slide-number");
    if (existing) existing.remove();

    const sliderItems = Array.from(list.querySelectorAll(".carousel__item"));
    const activeItemOriginalIndex = parseInt(
      sliderItems[1].querySelector(".carousel__title").getAttribute("data-item") || "0",
      10
    );
    const activeIndex = activeItemOriginalIndex < 10 ? `0${activeItemOriginalIndex}` : `0${activeItemOriginalIndex}`;

    const div = document.createElement("div");
    div.classList.add("carousel__slide-number");
    div.setAttribute("aria-live", "polite");
    div.textContent = `${activeIndex}/${sliderItems.length}`;
    arrowsWrap.appendChild(div);

    updateProgressBar();
  };

  const updateProgressBar = () => {
    const totalSlides = items.length;
    const sliderItems = Array.from(list.querySelectorAll(".carousel__item"));
    const titleAttr = sliderItems[0].querySelector(".carousel__title").getAttribute("data-item") || "0";
    const activeItem = parseInt(titleAttr, 10) - 1;
    const progressPercentage = (activeItem / totalSlides) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  };

  const resetCarouselState = () => {
    clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
      carousel.classList.remove("next");
      carousel.classList.remove("prev");
    }, TIME_RUNNING);
    if (timeRunningBar) timeRunningBar.style.width = "0%";
  };

  nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
  prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

  updateSlideMeta();
});