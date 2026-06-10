// LENS ATELIER interactions: transparent header, mobile navigation, reveal animations, parallax, slider, and contact feedback.
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const revealElements = document.querySelectorAll('.reveal');
const parallaxLayer = document.querySelector('.parallax-layer');
const contactForm = document.querySelector('.contact-form');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const dotsContainer = document.querySelector('.slider-dots');
const prevButton = document.querySelector('.slider-button.prev');
const nextButton = document.querySelector('.slider-button.next');

let currentTestimonial = 0;
let latestScrollY = 0;
let ticking = false;
let sliderTimer;

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 28);
}

function closeMenu() {
  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function updateParallax() {
  if (parallaxLayer) {
    parallaxLayer.style.transform = `scale(1.06) translate3d(0, ${latestScrollY * 0.12}px, 0)`;
  }
  ticking = false;
}

function showTestimonial(index) {
  currentTestimonial = (index + testimonials.length) % testimonials.length;

  testimonials.forEach((testimonial, testimonialIndex) => {
    testimonial.classList.toggle('active', testimonialIndex === currentTestimonial);
  });

  dotsContainer.querySelectorAll('button').forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentTestimonial);
    dot.setAttribute('aria-selected', String(dotIndex === currentTestimonial));
  });
}

function restartSlider() {
  window.clearInterval(sliderTimer);
  sliderTimer = window.setInterval(() => {
    showTestimonial(currentTestimonial + 1);
  }, 5200);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

revealElements.forEach((element) => revealObserver.observe(element));

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

testimonials.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
  dot.addEventListener('click', () => {
    showTestimonial(index);
    restartSlider();
  });
  dotsContainer.appendChild(dot);
});

prevButton.addEventListener('click', () => {
  showTestimonial(currentTestimonial - 1);
  restartSlider();
});

nextButton.addEventListener('click', () => {
  showTestimonial(currentTestimonial + 1);
  restartSlider();
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  status.textContent = 'Thank you. Your message has been prepared for the studio review.';
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
showTestimonial(0);
restartSlider();
