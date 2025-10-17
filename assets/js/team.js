document.addEventListener('DOMContentLoaded', () => {
  const testimonials = [
    {
      name: 'Lê Phạm Thanh Duy',
      desc: 'Người xây dựng giao diện người dùng, tập trung vào trải nghiệm tương tác mượt mà.',
      avatar: './assets/images/team/le-pham-thanh-duy.png',
      github: 'https://github.com/duypipi',
      website: 'https://duypipi.github.io/thanhdui.github.io/'
    },
    {
      name: 'Quách Phú Thuận',
      desc: 'Phụ trách phần logic máy chủ và cơ sở dữ liệu, đảm bảo hệ thống vận hành ổn định.',
      avatar: './assets/images/team/quach-phu-thuan.jpg',
      github: 'https://github.com/thuanfhu',
      website: 'https://thuanfhu.github.io/thuanphu-portfolio/'
    },
    {
      name: 'Lê Thị Mỹ Hậu',
      desc: 'Hiện thực hóa các bản thiết kế, mang lại giao diện trực quan và thân thiện.',
      avatar: './assets/images/team/le-thi-my-hau.jpg',
      github: 'https://github.com/annahwork',
      website: '#'
    },
    {
      name: 'Đỗ Kim Đại',
      desc: 'Đảm bảo trang web hiển thị tốt và hoạt động hiệu quả trên mọi thiết bị.',
      avatar: './assets/images/team/do-kim-dai.png',
      github: 'https://github.com/AyBi248',
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
    initialSlide: 1,
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