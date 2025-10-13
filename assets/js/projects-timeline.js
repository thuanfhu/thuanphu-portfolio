document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.querySelector('.projects__timeline');
  const progressBar = document.querySelector('.projects__progress-bar');
  const projectItems = document.querySelectorAll('.projects__item');

  if (!timeline || !progressBar) {
    console.warn('Timeline elements not found, animations will not run.');
    return;
  }

  // --- 1. Animate progress bar on scroll ---
  const handleScroll = () => {
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start progress when the top of the timeline reaches the middle of the viewport
    const startPoint = windowHeight / 2;
    // Calculate how far we've scrolled into the timeline
    const scrollDistance = startPoint - timelineRect.top;
    
    // Total scrollable height of the timeline section
    // We subtract windowHeight / 2 so the bar is full when the *bottom* of the timeline reaches the middle
    const totalHeight = timelineRect.height - (windowHeight / 2);

    if (scrollDistance > 0 && totalHeight > 0) {
      const progress = Math.min(scrollDistance / totalHeight, 1); // Clamp between 0 and 1
      progressBar.style.height = `${progress * 100}%`;
    } else {
      // If we are above the timeline, reset the bar
      progressBar.style.height = '0%';
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial check in case the page loads mid-scroll
  handleScroll();


  // --- 2. Animate project items on view ---
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  };

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the item is visible
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  projectItems.forEach(item => {
    observer.observe(item);
  });
});