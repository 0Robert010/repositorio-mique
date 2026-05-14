const ADMIN_AUTH_KEY = 'miqueias-admin-authenticated';
const ADMIN_PIN_HASH = 'd2c2fd387ef5fcb8cd621fdb5c698a2eb69cc8dd25ef61beebae0b63077bd0e5';

const loginSection = document.querySelector('[data-admin-login]');
const panelSection = document.querySelector('[data-admin-panel]');
const authForm = document.querySelector('[data-admin-auth]');
const authMessage = document.querySelector('[data-admin-auth-message]');
const profileForm = document.querySelector('[data-profile-form]');
const saveMessage = document.querySelector('[data-admin-save-message]');
const exportBox = document.querySelector('[data-admin-export-box]');
const exportOutput = document.querySelector('[data-admin-export-output]');
const exportButton = document.querySelector('[data-admin-export]');
const resetButton = document.querySelector('[data-admin-reset]');
const lockButton = document.querySelector('[data-admin-lock]');

function showPanel() {
  loginSection.hidden = true;
  panelSection.hidden = false;
  fillForm(window.MiqueiasProfile.get());
}

function showLogin() {
  loginSection.hidden = false;
  panelSection.hidden = true;
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function fillForm(profile) {
  Object.entries(profile).forEach(([key, value]) => {
    const field = profileForm.elements.namedItem(key);
    if (!field) return;
    field.value = Array.isArray(value) ? value.join('\n') : value;
  });
}

function readForm() {
  const data = Object.fromEntries(new FormData(profileForm).entries());
  data.currentFocus = data.currentFocus
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  return data;
}

function flash(message) {
  saveMessage.textContent = message;
  window.setTimeout(() => {
    saveMessage.textContent = '';
  }, 3600);
}

authForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const pin = authForm.elements.namedItem('pin').value.trim();
  const hash = await sha256(pin);

  if (hash !== ADMIN_PIN_HASH) {
    authMessage.textContent = 'PIN incorreto.';
    return;
  }

  sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
  authForm.reset();
  authMessage.textContent = '';
  showPanel();
});

profileForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const profile = window.MiqueiasProfile.save(readForm());
  window.MiqueiasProfile.apply(profile);
  fillForm(profile);
  flash('Informações salvas neste navegador.');
});

exportButton?.addEventListener('click', () => {
  const profile = window.MiqueiasProfile.save(readForm());
  exportOutput.value = JSON.stringify(profile, null, 2);
  exportBox.hidden = false;
  exportOutput.select();
});

resetButton?.addEventListener('click', () => {
  const profile = window.MiqueiasProfile.reset();
  window.MiqueiasProfile.apply(profile);
  fillForm(profile);
  exportBox.hidden = true;
  flash('Dados locais restaurados para o padrão do site.');
});

lockButton?.addEventListener('click', () => {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
  showLogin();
});

if (sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true') {
  showPanel();
} else {
  showLogin();
}
