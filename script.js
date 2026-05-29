const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const revealElements = document.querySelectorAll('.reveal');
const toast = document.querySelector('.flavor-toast');
const contactForm = document.querySelector('.contact-form');
const flavorNotes = {
  'Midnight Blend': 'Midnight Blend：黑巧克力、熟莓、焦糖榛果，适合意式浓缩与燕麦奶。',
  'Velvet Ethiopia': 'Velvet Ethiopia：伯爵茶、柑橘皮、茉莉花香，建议 92°C 手冲。',
  'Obsidian Reserve': 'Obsidian Reserve：朗姆酒渍葡萄、可可碎、烟熏橡木，限量珍藏。'
};
let toastTimer;

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
  }, 3200);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

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

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  status.textContent = '已收到信息。NOIRÉ 品牌顾问将在一个工作日内与你联系。';
  contactForm.reset();
});

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
