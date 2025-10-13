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