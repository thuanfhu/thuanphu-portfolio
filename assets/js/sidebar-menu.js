// ===== Sidebar toggling (default: COLLAPSED) =====
const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const togglerIcon = sidebarToggler?.querySelector("i");

// Mirror the collapsed state onto <body> so CSS can adapt margins etc.
function setBodyCollapsedState(collapsed) {
  document.body.classList.toggle("is-collapsed", collapsed);
}

if (sidebar && sidebarToggler && togglerIcon) {
  // Update icon and ARIA attrs based on current state
  const updateTogglerUI = () => {
    const isCollapsed = sidebar.classList.contains("collapsed");
    if (isCollapsed) {
      togglerIcon.classList.remove("fa-angles-left");
      togglerIcon.classList.add("fa-angles-right");
      sidebarToggler.setAttribute("aria-label", "Open sidebar");
      sidebarToggler.setAttribute("title", "Expand");
    } else {
      togglerIcon.classList.remove("fa-angles-right");
      togglerIcon.classList.add("fa-angles-left");
      sidebarToggler.setAttribute("aria-label", "Collapse sidebar");
      sidebarToggler.setAttribute("title", "Collapse");
    }
    setBodyCollapsedState(isCollapsed);
  };

  // Initial state defined in HTML (class "collapsed")
  updateTogglerUI();

  // Toggle on click
  sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateTogglerUI();
  });

  // Re-apply UI on resize (no height changes)
  window.addEventListener("resize", () => {
    updateTogglerUI();
  });
}

const backToTopBtn = document.querySelector(".back-to-top");

if (backToTopBtn) {
  const toggleBackToTop = () => {
    if (window.scrollY > 320) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const sidebarLinks = document.querySelectorAll('.sidebar .nav-link[href^="#"]');

if (sidebarLinks.length) {
  const header = document.querySelector(".header");

  sidebarLinks.forEach(link => {
    link.addEventListener("click", event => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) {
        return;
      }

      event.preventDefault();
      const headerOffset = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const offsetTop = Math.max(targetTop - headerOffset - 16, 0);

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });
}