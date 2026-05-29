const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const revealElements = document.querySelectorAll('.reveal');
const toast = document.querySelector('.flavor-toast');
const contactForm = document.querySelector('.contact-form');
const parallaxLayer = document.querySelector('.parallax-layer');
const magneticElements = document.querySelectorAll('.magnetic');
const flavorNotes = {
  'Midnight Blend': 'Midnight Blend：黑可可、熟莓、焦糖榛果；中深慢烘，适合浓缩与夜间拿铁。',
  'Ethiopia Reserve': 'Ethiopia Reserve：茉莉、柑橘皮、蜂蜜红茶；浅中烘，建议 92°C 手冲。',
  'Velvet Espresso': 'Velvet Espresso：烤杏仁、可可脂、深色糖浆；深烘浓缩曲线，呈现金色 crema。'
};
let toastTimer;
let latestScrollY = 0;
let ticking = false;

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function closeMenu() {
  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 3600);
}

function updateParallax() {
  if (parallaxLayer) {
    parallaxLayer.style.transform = `scale(1.08) translate3d(0, ${latestScrollY * 0.14}px, 0)`;
  }
  ticking = false;
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

revealElements.forEach((element) => revealObserver.observe(element));

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    showToast(flavorNotes[button.dataset.product]);
  });
});

magneticElements.forEach((element) => {
  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = '';
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  status.textContent = '预约已收到。NOIRÉ 品牌顾问将在一个工作日内确认你的私享品鉴时段。';
  contactForm.reset();
});

window.addEventListener('scroll', () => {
  latestScrollY = window.scrollY;
  updateHeader();

  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

updateHeader();
updateParallax();
