// Lightweight parallax for floating shapes
(() => {
  const shapes = document.querySelectorAll(".shape");
  if (!shapes.length) return;
  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.3;
      shape.style.transform = `translateY(${y * speed}px) rotate(${y * 0.1}deg)`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Sequential pulse for horizontal lines
(() => {
  const lines = document.querySelectorAll(".neural-line");
  if (!lines.length) return;
  setInterval(() => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = "1";
        line.style.transform = "scaleX(1.2)";
        setTimeout(() => {
          line.style.opacity = "0.2";
          line.style.transform = "scaleX(0.5)";
        }, 200);
      }, index * 300);
    });
  }, 2000);
})();

// Rising glowing particles
(() => {
  const host = document.querySelector(".neural-particles");
  if (!host) return;

  function spawnParticle() {
    const p = document.createElement("span");
    p.className = "particle";
    const size = 1 + Math.random() * 3; // 1px - 4px
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--drift", `${(Math.random() - 0.5) * 200}px`);
    p.style.animationDuration = `${2000 + Math.random() * 3000}ms`;
    p.style.animationTimingFunction = "ease-out";
    host.appendChild(p);
    // Cleanup after animation
    setTimeout(() => p.remove(), 6000);
  }

  // Spawn periodically
  setInterval(spawnParticle, 1500);
  // Seed initial particles
  for (let i = 0; i < 12; i++) setTimeout(spawnParticle, i * 120);
})();