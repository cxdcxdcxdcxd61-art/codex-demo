const header = document.querySelector('.product-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const revealElements = document.querySelectorAll('.reveal');
const magneticElements = document.querySelectorAll('.magnetic');
const toast = document.querySelector('.product-toast');
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
  }, 3600);
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

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const messages = {
      cart: 'Midnight Blend has been added to your black-gold cart.',
      tasting: 'Your private Midnight Blend tasting request has been reserved.'
    };

    showToast(messages[button.dataset.action]);
  });
});

window.addEventListener('scroll', updateHeader, { passive: true });

updateHeader();
