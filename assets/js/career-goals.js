// Here JS career goals
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#career-goals");
  if (!section) return;

  const circularLayout = section.querySelector(".goals-circular-layout");
  const timelineItems = section.querySelectorAll(".timeline-item");
  const detailsBox = section.querySelector(".goal-details");
  const detailsContent = detailsBox?.querySelector(".goal-details__content");
  const placeholder = detailsBox?.querySelector(".goal-details__placeholder");
  const detailsImage = detailsBox?.querySelector(".goal-details__image");
  const detailsTitle = detailsBox?.querySelector(".goal-details__title");
  const detailsDesc = detailsBox?.querySelector(".goal-details__description");
  if (!circularLayout || !detailsBox || !detailsContent || !placeholder || !detailsImage || !detailsTitle || !detailsDesc) return;

  let selectedGoal = null;

  const updateDetails = (item) => {
    const title = item ? item.dataset.title : "";
    const description = item ? item.dataset.description : "";
    const color = item ? "#EA285B" : "transparent";
    const imageSrc = item ? item.dataset.image : "";

    detailsContent.classList.add("is-changing");

    setTimeout(() => {
      if (item) {
        placeholder.style.display = "none";
        detailsImage.style.display = "block";
        detailsTitle.style.display = "block";
        detailsDesc.style.display = "block";

        detailsImage.src = imageSrc;
        detailsImage.alt = title;
        detailsTitle.textContent = title;
        detailsDesc.textContent = description;
      } else {
        placeholder.style.display = "block";
        detailsImage.style.display = "none";
        detailsTitle.style.display = "none";
        detailsDesc.style.display = "none";
      }
      detailsBox.style.borderTopColor = color;
      detailsContent.classList.remove("is-changing");
    }, 200);
  };

  timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (selectedGoal === item) {
        selectedGoal.classList.remove("is-selected");
        selectedGoal = null;
        updateDetails(null);
      } else {
        if (selectedGoal) selectedGoal.classList.remove("is-selected");
        selectedGoal = item;
        selectedGoal.classList.add("is-selected");
        updateDetails(selectedGoal);
      }
    });
  });

  const layoutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          circularLayout.classList.add("is-active");
          layoutObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -25% 0px" }
  );
  layoutObserver.observe(circularLayout);

  const mobileListContainer = section.querySelector(".mobile-goals-list");
  if (mobileListContainer && window.innerWidth <= 500) {
    const goalsData = Array.from(timelineItems).map((item) => ({
      title: item.dataset.title,
      description: item.dataset.description,
      icon: item.querySelector(".timeline-item__icon").cloneNode(true),
      colorClass: item.querySelector(".timeline-item__icon-wrapper").classList[1],
    }));

    goalsData.forEach((goal) => {
      const itemEl = document.createElement("div");
      itemEl.className = "mobile-goal-item";
      itemEl.innerHTML = `
        <div class="timeline-item__icon-wrapper ${goal.colorClass}"><div></div></div>
        <div>
          <h3 class="mobile-goal-item__title">${goal.title}</h3>
          <p class="mobile-goal-item__description">${goal.description}</p>
        </div>`;
      itemEl.querySelector(".timeline-item__icon-wrapper > div").appendChild(goal.icon);
      mobileListContainer.appendChild(itemEl);
    });

    const mobileItems = section.querySelectorAll(".mobile-goal-item");
    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-active");
              const iconWrapper = entry.target.querySelector(".timeline-item__icon-wrapper > div");
              const icon = entry.target.querySelector(".timeline-item__icon");
              if (iconWrapper.parentElement.classList.contains("timeline-item__icon-wrapper--goal1")) iconWrapper.style.backgroundColor = "var(--goal1-color)";
              if (iconWrapper.parentElement.classList.contains("timeline-item__icon-wrapper--goal2")) iconWrapper.style.backgroundColor = "var(--goal2-color)";
              if (iconWrapper.parentElement.classList.contains("timeline-item__icon-wrapper--goal3")) iconWrapper.style.backgroundColor = "var(--goal3-color)";
              if (iconWrapper.parentElement.classList.contains("timeline-item__icon-wrapper--goal4")) iconWrapper.style.backgroundColor = "var(--goal4-color)";
              icon.style.color = "white";
            }, index * 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    mobileItems.forEach((item) => mobileObserver.observe(item));
  }
});