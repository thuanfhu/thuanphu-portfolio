(function () {
  const tabs = document.querySelectorAll('.skills__tab');
  const iconGroups = document.querySelectorAll('.skills__icons');
  const cardGroups = document.querySelectorAll('.skills__group');

  function activate(target) {
    tabs.forEach(btn => {
      const on = btn.dataset.target === target;
      btn.classList.toggle('skills__tab--active', on);
      btn.setAttribute('aria-selected', String(on));
    });

    iconGroups.forEach(group => {
      const match = group.dataset.skill === target;
      group.classList.toggle('skills__icons--active', match);
      if (match) {
        group.removeAttribute('hidden');
      } else {
        group.setAttribute('hidden', '');
      }
    });

    cardGroups.forEach(group => {
      const match = group.dataset.skill === target;
      group.classList.toggle('skills__group--active', match);
      if (match) {
        group.removeAttribute('hidden');
      } else {
        group.setAttribute('hidden', '');
      }
    });
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.target));
    btn.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate(btn.dataset.target);
      }
    });
  });
})();
