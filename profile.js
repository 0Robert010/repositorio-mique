const PROFILE_STORAGE_KEY = 'miqueias-profile-v1';

const defaultProfile = {
  name: 'Miqueias Masuete',
  availability: 'Aberto a freelance e estágio',
  role: 'Desenvolvedor Web em formação | Engenharia de Computação',
  heroTitle: 'Crio sites modernos para negócios e projetos profissionais.',
  heroDescription:
    'Transformo ideias em páginas funcionais, bonitas e publicáveis, incluindo portfólios, projetos acadêmicos, catálogos e sites para pequenos negócios.',
  educationLabel: 'FACENS',
  educationText: 'Engenharia de Computação',
  location: 'Sorocaba/SP',
  positionTitle: 'Ideia no papel, site no ar.',
  positionText:
    'Desenvolvo páginas claras, responsivas e publicadas com GitHub e Vercel, pensando na apresentação do negócio e na experiência de quem vai usar.',
  aboutTitle: 'Estudo tecnologia com foco em aplicação real.',
  aboutSummary:
    'Meu objetivo profissional é evoluir como desenvolvedor web/full stack, atuar em estágio, freelas e projetos para pequenos negócios, sempre com entrega publicada, organizada e fácil de entender.',
  currentFocus: [
    'Curso Engenharia de Computação na FACENS.',
    'Foco em front-end, lógica, banco de dados e fundamentos de back-end.',
    'Crio sites responsivos em HTML, CSS e JavaScript com deploy na Vercel.',
    'Uso GitHub para versionar, documentar e apresentar evolução técnica.',
  ],
  practicalExperience:
    'Minha rotina com loja, atendimento, organização de produtos e impressão 3D me dá visão de cliente. Isso ajuda a criar páginas que não ficam só bonitas: elas precisam explicar, vender, orientar e facilitar contato.',
  email: 'miqueiasrobert@icloud.com',
  whatsapp: '5515991727075',
  github: 'https://github.com/0Robert010',
};

function normalizeProfile(profile) {
  const nextProfile = { ...defaultProfile, ...profile };

  if (typeof nextProfile.currentFocus === 'string') {
    nextProfile.currentFocus = nextProfile.currentFocus
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(nextProfile.currentFocus) || nextProfile.currentFocus.length === 0) {
    nextProfile.currentFocus = defaultProfile.currentFocus;
  }

  nextProfile.whatsapp = String(nextProfile.whatsapp || defaultProfile.whatsapp).replace(/\D/g, '');

  return nextProfile;
}

function getProfile() {
  try {
    const storedProfile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
    return normalizeProfile(storedProfile);
  } catch {
    return { ...defaultProfile };
  }
}

function saveProfile(profile) {
  const nextProfile = normalizeProfile(profile);
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
  return nextProfile;
}

function resetProfile() {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  return { ...defaultProfile };
}

function updateContactLinks(profile) {
  const whatsappText = encodeURIComponent(
    `Oi ${profile.name.split(' ')[0]}, vim pelo seu portfólio e quero conversar sobre um projeto web.`
  );

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.setAttribute('href', `mailto:${profile.email}`);
  });

  document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
    link.setAttribute('href', `https://wa.me/${profile.whatsapp}?text=${whatsappText}`);
  });

  document.querySelectorAll('a[href*="github.com/0Robert010"]').forEach((link) => {
    link.setAttribute('href', profile.github);
  });
}

function applyProfile(profile = getProfile()) {
  document.querySelectorAll('[data-profile]').forEach((element) => {
    const key = element.dataset.profile;
    if (profile[key]) {
      element.textContent = profile[key];
    }
  });

  document.querySelectorAll('[data-profile-list]').forEach((list) => {
    const key = list.dataset.profileList;
    const items = profile[key];
    if (!Array.isArray(items)) return;

    list.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  });

  updateContactLinks(profile);
  return profile;
}

window.MiqueiasProfile = {
  apply: applyProfile,
  defaults: defaultProfile,
  get: getProfile,
  reset: resetProfile,
  save: saveProfile,
  storageKey: PROFILE_STORAGE_KEY,
};

applyProfile();
