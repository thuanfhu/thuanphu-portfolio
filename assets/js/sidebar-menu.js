// ===== Sidebar toggling (default: COLLAPSED) =====
const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const togglerIcon = sidebarToggler?.querySelector("i");

// Safety: do nothing if required elements are missing
if (sidebar && sidebarToggler && togglerIcon) {
  // Helper: update icon + aria attributes based on state
  const updateTogglerUI = () => {
    const isCollapsed = sidebar.classList.contains("collapsed");
    if (isCollapsed) {
      // Collapsed -> show expand icon
      togglerIcon.classList.remove("fa-angles-left");
      togglerIcon.classList.add("fa-angles-right");
      sidebarToggler.setAttribute("aria-label", "Mở sidebar");
      sidebarToggler.setAttribute("title", "Expand");
    } else {
      // Expanded -> show collapse icon
      togglerIcon.classList.remove("fa-angles-right");
      togglerIcon.classList.add("fa-angles-left");
      sidebarToggler.setAttribute("aria-label", "Thu gọn sidebar");
      sidebarToggler.setAttribute("title", "Collapse");
    }
  };

  // Default HTML already has class "collapsed" => sidebar starts collapsed
  updateTogglerUI();

  // Toggle on click
  sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateTogglerUI();
  });

  // (Optional) Refresh UI on resize without affecting height
  window.addEventListener("resize", () => {
    updateTogglerUI();
  });
}