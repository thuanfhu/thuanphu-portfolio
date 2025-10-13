// =============================== SKILLS INTERACTIONS (v2) ===============================
(() => {
  const tabs = Array.from(document.querySelectorAll('.skills__tab'));
  const groups = Array.from(document.querySelectorAll('.skills__group'));
  const desc = document.getElementById('skills-desc');
  const tip = document.getElementById('skilltip');
  const tipInner = tip?.querySelector('.skilltip__inner');

  const messages = {
    fe: 'Front-end: HTML/CSS, JavaScript/TypeScript, React, Redux Toolkit, TanStack Query và Tailwind CSS — tập trung hiệu năng & khả năng truy cập.',
    be: 'Back-end: Node.js/Express, NestJS, Java 21 & Spring Boot (Security, Data JPA), kèm realtime với Socket.IO.',
    db: 'Databases: PostgreSQL, MySQL, MongoDB, Redis — thiết kế schema, indexing và cache cho độ tin cậy & tốc độ.',
    devops: 'DevOps: Docker, GitHub Actions CI/CD, AWS (EC2, S3) và Vercel — triển khai nhanh, an toàn.',
    en: 'Chứng chỉ TOEIC Listening & Reading 855/990 — Listening 460/495, Reading 395/495.'
  };

  function setDesc(key){ desc.textContent = messages[key] || ''; }

  function activate(name) {
    tabs.forEach(t => {
      const active = t.dataset.target === name;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    groups.forEach(g => {
      const show = g.dataset.skill === name;
      if (show) {
        g.hidden = false;
        // re-trigger stagger animation
        g.classList.remove('is-active');
        requestAnimationFrame(() => g.classList.add('is-active'));
      } else {
        g.hidden = true;
        g.classList.remove('is-active');
      }
    });
    setDesc(name);
    // pulse hiệu ứng rail
    const rail = document.querySelector('.skills__rail');
    rail?.classList.remove('pulse'); void rail?.offsetWidth; rail?.classList.add('pulse');
  }
  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.target)));
  activate('fe'); // default

  // Tooltip đẹp cho icon (mô tả ngắn gọn tiếng Việt lấy từ data-tip)
  function showTip(target, text){
    if (!tip || !tipInner) return;
    tipInner.textContent = text;
    const rect = target.getBoundingClientRect(), offset = 12;
    tip.style.left = `${rect.left + rect.width/2}px`;
    tip.style.top = `${rect.top - offset}px`;
    tip.hidden = false;
    tip.classList.remove('enter'); void tip.offsetWidth; tip.classList.add('enter');
  }
  function hideTip(){ if (!tip) return; tip.classList.remove('enter'); tip.hidden = true; }
  document.addEventListener('pointerover', (e) => {
    const btn = e.target.closest('.badge'); if (!btn){ hideTip(); return; }
    const text = btn.getAttribute('data-tip') || btn.querySelector('img')?.alt || 'Skill';
    showTip(btn, text);
  });
  document.addEventListener('pointerout', (e) => { if (e.target.closest('.badge')) hideTip(); });

  // Animate meters (English)
  function animateMeters(){
    document.querySelectorAll('.meter').forEach(m => {
      const score = +m.dataset.score, max = +m.dataset.max;
      const color = m.dataset.color || '#0894E2';
      const fill = m.querySelector('.meter__fill');
      const pct = Math.min(100, Math.max(0, (score / max) * 100));
      fill.style.setProperty('--pct', pct + '%');
      fill.style.setProperty('--color', color);
      fill.classList.add('run');
    });
  }
  const io = new IntersectionObserver((entries)=> {
    entries.forEach(e => { if (e.isIntersecting) animateMeters(); });
  }, { threshold: 0.3 });
  const enGroup = document.querySelector('[data-skill="en"]');
  if (enGroup) io.observe(enGroup);
})();