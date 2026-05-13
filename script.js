/* ==========================================================================
   Estado global e seleção de elementos
   ========================================================================== */

const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopButton = document.querySelector('[data-back-to-top]');
const observedSections = document.querySelectorAll('.section-observe');
const contactForm = document.querySelector('[data-contact-form]');
const successMessage = document.querySelector('[data-form-success]');
const currentYear = document.querySelector('[data-current-year]');
const typingTarget = document.querySelector('[data-typing]');

currentYear.textContent = new Date().getFullYear();

/* ==========================================================================
   Header, menu mobile e scroll suave
   ========================================================================== */

function setHeaderState() {
  const isScrolled = window.scrollY > 12;
  header.classList.toggle('is-scrolled', isScrolled);
  backToTopButton.classList.toggle('is-visible', window.scrollY > 520);
}

function closeMobileMenu() {
  document.body.classList.remove('menu-open');
  nav.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      event.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', targetId);
      closeMobileMenu();
    }
  });
});

backToTopButton.addEventListener('click', () => {
  document.querySelector('#inicio')?.scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

/* ==========================================================================
   Animações ao rolar e destaque automático do menu
   ========================================================================== */

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

const sectionMap = Array.from(navLinks)
  .map((link) => {
    const id = link.getAttribute('href');
    return id ? document.querySelector(id) : null;
  })
  .filter(Boolean);

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

/* ==========================================================================
   Efeito de digitação
   ========================================================================== */

function startTypingEffect() {
  const fullText = typingTarget.textContent.trim();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return;

  typingTarget.textContent = '';
  let index = 0;

  const typeNextCharacter = () => {
    typingTarget.textContent = fullText.slice(0, index);
    index += 1;

    if (index <= fullText.length) {
      window.setTimeout(typeNextCharacter, 38);
    }
  };

  window.setTimeout(typeNextCharacter, 250);
}

startTypingEffect();

/* ==========================================================================
   Validação simples do formulário
   ========================================================================== */

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

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = contactForm.elements.namedItem('name');
  const email = contactForm.elements.namedItem('email');
  const message = contactForm.elements.namedItem('message');
  let isValid = true;

  setFieldError(name, '');
  setFieldError(email, '');
  setFieldError(message, '');
  successMessage.textContent = '';

  if (name.value.trim().length < 2) {
    setFieldError(name, 'Informe seu nome.');
    isValid = false;
  }

  if (!validateEmail(email.value.trim())) {
    setFieldError(email, 'Informe um e-mail válido.');
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    setFieldError(message, 'Escreva uma mensagem com pelo menos 10 caracteres.');
    isValid = false;
  }

  if (!isValid) return;

  successMessage.textContent = 'Mensagem validada com sucesso. Agora conecte esse formulário a um serviço de envio.';
  contactForm.reset();
});
