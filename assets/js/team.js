document.addEventListener('DOMContentLoaded', () => {
  const testimonials = [
    {
      name: 'David Dell',
      desc: 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      github: '#',
      website: '#'
    },
    {
      name: 'Rose Bush',
      desc: 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop',
      github: '#',
      website: '#'
    },
    {
      name: 'Jones Gail',
      desc: 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      github: '#',
      website: '#'
    },
    {
      name: 'Maria Smantha',
      desc: 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      github: '#',
      website: '#'
    }
  ];

  // Hàm render 1 slide từ template (có thể tái sử dụng)
  function renderSlide(item) {
    const tpl = document.getElementById('slide-template');
    if (!tpl) return document.createDocumentFragment();
    
    const node = tpl.content.cloneNode(true);
    node.querySelector('.card__avatar').src = item.avatar;
    node.querySelector('.card__avatar').alt = `Ảnh đại diện của ${item.name}`;
    node.querySelector('.card__name').textContent = item.name;
    node.querySelector('.card__description').textContent = item.desc;
    const [gh, web] = node.querySelectorAll('.card__icon-btn');
    gh.href = item.github || '#';
    web.href = item.website || '#';
    return node;
  }

  // Mount tất cả slides
  const host = document.getElementById('slides-host');
  if (host) {
    testimonials.forEach(item => host.appendChild(renderSlide(item)));
  }

  // Khởi tạo Swiper sau khi render xong
  const teamSwiper = new Swiper('.team-swiper', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 3,
    centeredSlides: true,
    grabCursor: true,
    pagination: { el: '.team .swiper-controls .swiper-pagination', clickable: true },
    navigation: { nextEl: '.team .swiper-controls .swiper-button-next', prevEl: '.team .swiper-controls .swiper-button-prev' },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 3 },
      1024: { slidesPerView: 3, spaceBetween: 3 }
    }
  });

  window.TestimonialSlider = {
    setItems(items) {
      if (!host) return;
      host.innerHTML = '';
      items.forEach(item => host.appendChild(renderSlide(item)));
      teamSwiper.update();
    },
    addItem(item) {
      if (!host) return;
      host.appendChild(renderSlide(item));
      teamSwiper.update();
    }
  };
});