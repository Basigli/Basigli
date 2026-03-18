// Intersection Observer – reveal elements on scroll
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => observer.observe(el));

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach((section) => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + section.id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// Contact form – simple mailto fallback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body    = encodeURIComponent(
      'Name: ' + name + '\nEmail: ' + email + '\n\n' + message
    );

    // TODO: replace with your actual email address before deploying
    window.location.href = 'mailto:your@email.com?subject=' + subject + '&body=' + body;
  });
}
