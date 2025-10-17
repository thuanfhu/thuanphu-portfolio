const achievementsData = [
  {
    type: "red",
    image: "./assets/images/achievements/HB-HK1-23to24.png",
    alt: "Học bổng HK1 2023-2024",
    icon: "fa-trophy",
    title: "Học bổng HK1 2023-2024",
    issuer: "Trường đại học giao thông vận tải thành phố Hồ Chí Minh",
    description: "Đạt được học bổng loại xuất sắc của học kì 1 năm học 2023 - 2024"
  },
  {
    type: "blue",
    image: "./assets/images/achievements/GCP-Foundations-Certificate.jpg",
    alt: "Chứng chỉ Google Cloud Foundations",
    icon: "fa-certificate",
    title: "Chứng chỉ GCP Foundations",
    issuer: "Google Cloud Platform",
    description: "Chứng minh kiến thức toàn diện về cơ sở hạ tầng và dịch vụ đám mây của Google Cloud."
  },
  {
    type: "red",
    image: "./assets/images/achievements/TOEIC-855-Certificate.png",
    alt: "Chứng chỉ TOEIC 855 điểm",
    icon: "fa-medal",
    title: "Chứng chỉ TOEIC 855 điểm",
    issuer: "IIG chi nhánh Hồ Chí Minh",
    description: "Chứng minh khả năng sử dụng tiếng Anh trong môi trường làm việc quốc tế."
  },
  {
    type: "blue",
    image: "./assets/images/achievements/HB-HK2-23to24.png",
    alt: "Học bổng HK2 2023-2024",
    icon: "fa-cogs",
    title: "Học bổng HK2 2023-2024",
    issuer: "Trường đại học giao thông vận tải thành phố Hồ Chí Minh",
    description: "Đạt được học bổng loại xuất sắc của học kì 2 năm học 2023 - 2024"
  }
];

const createAchievementCardHTML = (item) => `
  <div class="achievement-card">
    <div class="card-image-wrapper">
      <img src="${item.image}" alt="${item.alt}" class="card-image" onerror="this.onerror=null;this.src='https://placehold.co/600x400/2a2a2e/f0f0f0?text=Image+Not+Found';">
      <button class="preview-btn" data-img-src="${item.image}"><i class="fas fa-expand"></i></button>
    </div>
    <div class="card-content">
      <i class="card-icon fas ${item.icon}"></i>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-issuer">${item.issuer}</p>
      <p class="card-description">${item.description}</p>
    </div>
  </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const achievementsSection = document.getElementById("achievements");
  if (!achievementsSection) return;

  const gridContainer = achievementsSection.querySelector("#timeline-desktop-content");
  const mobileContainer = achievementsSection.querySelector("#timeline-mobile-content");
  const nodesContainer = achievementsSection.querySelector("#timeline-nodes-container");
  const path = achievementsSection.querySelector("#timeline-path");

  if (!gridContainer || !mobileContainer || !nodesContainer || !path) return;

  achievementsData.forEach((item, index) => {
    const isLeft = index % 2 === 0;

    const desktopItem = document.createElement("div");
    desktopItem.className = `timeline-item card-${item.type} ${isLeft ? "left" : "right"}`;
    desktopItem.innerHTML = createAchievementCardHTML(item);
    gridContainer.appendChild(desktopItem);

    const mobileItem = document.createElement("div");
    mobileItem.className = `timeline-item-mobile card-${item.type}`;
    mobileItem.innerHTML = createAchievementCardHTML(item);
    mobileContainer.appendChild(mobileItem);
  });

  const timelineItems = achievementsSection.querySelectorAll(".timeline-item, .timeline-item-mobile");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  timelineItems.forEach((item) => observer.observe(item));

  const modal = achievementsSection.querySelector("#imageModal");
  const modalImg = achievementsSection.querySelector("#modalImage");
  const closeBtn = achievementsSection.querySelector(".close-btn");

  const openModal = (src) => {
    if (!modal || !modalImg) return;
    modal.style.display = "block";
    modal.style.animation = "fadeIn 0.5s";
    modalImg.src = src;
    modalImg.style.animation = "zoomIn 0.5s forwards";
  };

  const closeModal = () => {
    if (!modal || !modalImg) return;
    modalImg.style.animation = "zoomOut 0.4s forwards";
    modal.style.animation = "fadeOut 0.4s forwards";
    window.setTimeout(() => { modal.style.display = "none"; }, 400);
  };

  achievementsSection.querySelectorAll(".preview-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-img-src");
      if (src) openModal(src);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  const setupTimelineAnimation = () => {
    if (window.innerWidth <= 768) {
      path.setAttribute("d", "");
      path.style.strokeDasharray = 0;
      path.style.strokeDashoffset = 0;
      nodesContainer.innerHTML = "";
      return;
    }

    const items = Array.from(gridContainer.children);
    const title = achievementsSection.querySelector(".main-title");
    if (!items.length || !title) return;

    nodesContainer.innerHTML = "";
    const nodeElements = [];
    const nodePoints = [];
    const gridRect = gridContainer.getBoundingClientRect();

    items.forEach((item, index) => {
      const node = document.createElement("div");
      node.className = `timeline-node node-${achievementsData[index].type}`;
      nodesContainer.appendChild(node);
      nodeElements.push(node);

      const cardRect = item.getBoundingClientRect();
      const centerGutterX = gridRect.width / 2;
      const halfGutterWidth = 150 / 2;
      const nodeX = item.classList.contains("left")
        ? centerGutterX + halfGutterWidth
        : centerGutterX - halfGutterWidth;
      const nodeY = (cardRect.top - gridRect.top) + cardRect.height / 2;

      node.style.left = `${nodeX - node.offsetWidth / 2}px`;
      node.style.top = `${nodeY - node.offsetHeight / 2}px`;

      nodePoints.push({ x: nodeX, y: nodeY });
    });

    if (!nodePoints.length) {
      path.setAttribute("d", "");
      return;
    }

    // Start the path directly at the first node so the visible line begins from node #1
    let pathD = `M ${nodePoints[0].x} ${nodePoints[0].y}`;

    for (let i = 0; i < nodePoints.length - 1; i += 1) {
      const current = nodePoints[i];
      const next = nodePoints[i + 1];
      const midY = (current.y + next.y) / 2;
      const offset = Math.abs(next.x - current.x) * 0.8;
      const cp1x = (i % 2 === 0) ? current.x + offset : current.x - offset;
      const cp2x = (i % 2 === 0) ? next.x + offset : next.x - offset;

      pathD += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, ${next.x} ${next.y}`;
    }

    path.setAttribute("d", pathD);

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    let ticking = false;
    const updateOnScroll = () => {
      const containerRect = gridContainer.getBoundingClientRect();
      const startAnimationAt = window.innerHeight * 0.8;
      const endAnimationAt = window.innerHeight * 0.2;

      // Lấy vị trí của node đầu tiên và node cuối cùng
      const firstNodeY = nodePoints[0].y + containerRect.top;
      const lastNodeY = nodePoints[nodePoints.length - 1].y + containerRect.top;

      // Tính toán khoảng cách cuộn dựa trên vị trí các node
      const totalScrollDistance = lastNodeY - firstNodeY;
      const scrollYRelativeToNodes = startAnimationAt - firstNodeY;

      let progress = scrollYRelativeToNodes / totalScrollDistance;
      progress = Math.max(0, Math.min(1, progress));

      const drawLength = pathLength * progress;
      path.style.strokeDashoffset = pathLength - drawLength;

      const activeNodeIndex = Math.floor(progress * (nodeElements.length - 0.001));
      nodeElements.forEach((node, index) => {
        if (index <= activeNodeIndex) {
          node.classList.add("active");
        } else {
          node.classList.remove("active");
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateOnScroll();
  };

  window.addEventListener("load", setupTimelineAnimation);
  window.addEventListener("resize", () => {
    clearTimeout(window.__achievementsResizeTimer);
    window.__achievementsResizeTimer = setTimeout(setupTimelineAnimation, 250);
  });
});