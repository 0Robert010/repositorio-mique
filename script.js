const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopButton = document.querySelector('[data-back-to-top]');
const observedSections = document.querySelectorAll('.section-observe');
const contactForm = document.querySelector('[data-contact-form]');
const successMessage = document.querySelector('[data-form-success]');
const currentYear = document.querySelector('[data-current-year]');

const contact = {
  email: 'miqueiasrobert@icloud.com',
  whatsapp: '5515991727075',
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function setHeaderState() {
  const isScrolled = window.scrollY > 12;
  header?.classList.toggle('is-scrolled', isScrolled);
  backToTopButton?.classList.toggle('is-visible', window.scrollY > 520);
}

function closeMobileMenu() {
  document.body.classList.remove('menu-open');
  nav?.classList.remove('is-open');
  navToggle?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Abrir menu');
}

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open') ?? false;
  document.body.classList.toggle('menu-open', isOpen);
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId?.startsWith('#')) {
      closeMobileMenu();
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', targetId);
    closeMobileMenu();
  });
});

backToTopButton?.addEventListener('click', () => {
  document.querySelector('#inicio')?.scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

if ('IntersectionObserver' in window && observedSections.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  observedSections.forEach((section) => revealObserver.observe(section));
} else {
  observedSections.forEach((section) => section.classList.add('is-visible'));
}

const sectionMap = Array.from(navLinks)
  .map((link) => {
    const id = link.getAttribute('href');
    return id?.startsWith('#') ? document.querySelector(id) : null;
  })
  .filter(Boolean);

if ('IntersectionObserver' in window && sectionMap.length > 0) {
  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-42% 0px -48% 0px', threshold: 0 }
  );

  sectionMap.forEach((section) => activeSectionObserver.observe(section));
}

function setFieldError(field, message) {
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  field.classList.toggle('is-invalid', Boolean(message));

  if (error) {
    error.textContent = message;
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildWhatsAppMessage({ name, email, message }) {
  const text = [
    `Oi Miqueias, sou ${name}.`,
    `Meu e-mail: ${email}.`,
    '',
    message,
  ].join('\n');

  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = contactForm.elements.namedItem('name');
  const email = contactForm.elements.namedItem('email');
  const message = contactForm.elements.namedItem('message');
  let isValid = true;

  setFieldError(name, '');
  setFieldError(email, '');
  setFieldError(message, '');

  if (successMessage) {
    successMessage.textContent = '';
  }

  if (name.value.trim().length < 2) {
    setFieldError(name, 'Informe seu nome.');
    isValid = false;
  }

  if (!validateEmail(email.value.trim())) {
    setFieldError(email, 'Informe um e-mail válido.');
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    setFieldError(message, 'Conte sua ideia com pelo menos 10 caracteres.');
    isValid = false;
  }

  if (!isValid) return;

  const url = buildWhatsAppMessage({
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
  });

  window.open(url, '_blank', 'noopener,noreferrer');

  if (successMessage) {
    successMessage.textContent = 'Mensagem pronta. O WhatsApp foi aberto para você confirmar o envio.';
  }

  contactForm.reset();
});
