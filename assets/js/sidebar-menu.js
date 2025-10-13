// ===== Sidebar toggling (default: COLLAPSED) =====
const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const togglerIcon = sidebarToggler?.querySelector("i");

// Gắn cờ trạng thái lên <body> để CSS có thể căn chỉnh avatar header, lề section...
function setBodyCollapsedState(collapsed) {
  document.body.classList.toggle("is-collapsed", collapsed);
}

// Safety
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
    setBodyCollapsedState(isCollapsed);
  };

  // HTML khởi tạo đã có class "collapsed"
  updateTogglerUI();

  // Toggle on click
  sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateTogglerUI();
  });

  // Refresh UI on resize (không đổi chiều cao)
  window.addEventListener("resize", () => {
    updateTogglerUI();
  });
}