const landingPage = document.querySelector('.landing-page');
const dashboard = document.getElementById('dashboard');
const authBackdrop = document.querySelector('.auth-backdrop');
const authStatus = document.querySelector('.auth-status');
const signInForm = document.querySelector('[data-auth-form="signin"]');
const signUpForm = document.querySelector('[data-auth-form="signup"]');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const guestActions = document.querySelector('.guest-actions');
const memberActions = document.querySelector('.member-actions');
const userName = document.querySelector('[data-user-name]');
const userEmail = document.querySelector('[data-user-email]');
const profileMenu = document.querySelector('.profile-menu');
const miniAvatar = document.querySelector('[data-profile-menu]');
const profileCards = document.querySelectorAll('.profile-card .avatar, .mini-avatar');
const navLinks = document.querySelectorAll('.nav-link');
const viewPanels = document.querySelectorAll('.dashboard-view');
const saveButtons = document.querySelectorAll('.save-button');
const mySavedJobsList = document.querySelector('#saved-jobs-list');
const savedCounter = document.querySelector('.saved-count');
const savedJobsSummary = document.querySelector('#saved-jobs-summary');
const profileForm = document.getElementById('profile-form');
const profileStatus = document.getElementById('profile-status');

let activeView = 'jobs';
let savedJobs = [
  { title: 'Brand Designer', company: 'Northstar', location: 'Remote', tag: 'north' },
  { title: 'Design Lead', company: 'Lumen Studio', location: 'Hybrid', tag: 'lumen' },
  { title: 'Senior Product Designer', company: 'Lumen Studio', location: 'New York, NY', tag: 'lumen' }
];

function setAuthTab(mode) {
  const activeTab = document.querySelector(`[data-auth-tab="${mode}"]`);

  authTabs.forEach((tab) => tab.classList.toggle('active', tab === activeTab));
  authForms.forEach((form) => {
    const isSelected = form.dataset.authForm === mode;
    form.hidden = !isSelected;
  });
}

function openAuth(mode = 'signin') {
  authBackdrop.hidden = false;
  document.body.classList.add('modal-open');
  setAuthTab(mode);
  authStatus.textContent = '';
}

function closeAuth() {
  authBackdrop.hidden = true;
  document.body.classList.remove('modal-open');
}

function showDashboard() {
  landingPage.hidden = true;
  dashboard.hidden = false;
}

function showLanding() {
  landingPage.hidden = false;
  dashboard.hidden = true;
}

function updateUserProfile(name, email) {
  const safeName = name || 'Jordan Davis';
  const safeEmail = email || 'jordan@example.com';

  userName.textContent = safeName;
  userEmail.textContent = safeEmail;

  document.querySelectorAll('.profile-card strong').forEach((label) => {
    label.textContent = safeName;
  });

  document.querySelectorAll('.avatar, .mini-avatar').forEach((avatar) => {
    const initials = safeName
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    avatar.textContent = initials;
  });
}

function setActiveView(viewName) {
  activeView = viewName;

  viewPanels.forEach((panel) => {
    const isVisible = panel.dataset.view === viewName;
    panel.classList.toggle('hidden', !isVisible);
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.view === viewName;
    link.classList.toggle('active', isActive);
  });
}

function renderSavedJobs() {
  if (!mySavedJobsList) return;

  mySavedJobsList.innerHTML = '';

  savedJobs.forEach((job) => {
    const item = document.createElement('article');
    item.className = 'saved-job-card';
    item.innerHTML = `
      <div class="small-logo logo-${job.tag}">${job.company.charAt(0)}</div>
      <div>
        <strong>${job.title}</strong>
        <span>${job.company} · ${job.location}</span>
      </div>
      <button type="button" class="inline-remove" data-remove-job="${job.title}">Remove</button>
    `;
    mySavedJobsList.appendChild(item);
  });

  const count = savedJobs.length;
  if (savedCounter) savedCounter.textContent = count;
  if (savedJobsSummary) savedJobsSummary.textContent = `${count} jobs saved`;
}

function toggleSaveButton(button) {
  const title = button.dataset.saveTitle;
  const company = button.dataset.company;
  const location = button.dataset.location;
  const tag = button.dataset.tag;

  const jobExists = savedJobs.some((job) => job.title === title && job.company === company);

  if (jobExists) {
    savedJobs = savedJobs.filter((job) => !(job.title === title && job.company === company));
    button.classList.remove('saved');
    button.textContent = '♡';
    button.setAttribute('aria-label', `Save ${title}`);
  } else {
    savedJobs.unshift({ title, company, location, tag });
    button.classList.add('saved');
    button.textContent = '♥';
    button.setAttribute('aria-label', `Unsave ${title}`);
  }

  renderSavedJobs();
}

function signOut() {
  profileMenu.classList.remove('visible');
  updateUserProfile('Jordan Davis', 'jordan@example.com');
  showLanding();
  setActiveView('jobs');
}

authTabs.forEach((tab) => {
  tab.addEventListener('click', () => setAuthTab(tab.dataset.authTab));
});

document.querySelectorAll('[data-open-auth]').forEach((button) => {
  button.addEventListener('click', () => openAuth(button.dataset.openAuth));
});

document.querySelector('[data-close-auth]').addEventListener('click', closeAuth);

authBackdrop.addEventListener('click', (event) => {
  if (event.target === authBackdrop) closeAuth();
});

signInForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value.trim();

  if (!email || !password || password.length < 6) {
    authStatus.textContent = 'Please enter a valid email and password.';
    return;
  }

  authStatus.textContent = 'Signing in...';
  setTimeout(() => {
    const safeName = document.getElementById('signin-email').value.includes('admin')
      ? 'Jordan Davis'
      : 'Jordan Davis';
    updateUserProfile(safeName, email);
    closeAuth();
    showDashboard();
    setActiveView('jobs');
  }, 400);
});

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!name || !email || !password || password.length < 6) {
    authStatus.textContent = 'Please complete all fields with a valid password.';
    return;
  }

  authStatus.textContent = 'Account created successfully!';
  setTimeout(() => {
    updateUserProfile(name, email);
    closeAuth();
    showDashboard();
    setActiveView('jobs');
  }, 400);
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveView(link.dataset.view);
  });
});

document.querySelectorAll('[data-view-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveView(link.dataset.viewLink);
  });
});

miniAvatar.addEventListener('click', () => {
  profileMenu.classList.toggle('visible');
});

document.addEventListener('click', (event) => {
  if (!profileMenu.contains(event.target) && !miniAvatar.contains(event.target)) {
    profileMenu.classList.remove('visible');
  }
});

document.querySelector('[data-signout]').addEventListener('click', signOut);

saveButtons.forEach((button) => {
  button.addEventListener('click', () => toggleSaveButton(button));
});

if (mySavedJobsList) {
  mySavedJobsList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-job]');
    if (!button) return;

    const title = button.dataset.removeJob;
    savedJobs = savedJobs.filter((job) => job.title !== title);
    renderSavedJobs();

    const matchingJobButton = document.querySelector(`[data-save-title="${title}"]`);
    if (matchingJobButton) {
      matchingJobButton.classList.remove('saved');
      matchingJobButton.textContent = '♡';
      matchingJobButton.setAttribute('aria-label', `Save ${title}`);
    }
  });
}

if (profileForm) {
  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('profile-name').value.trim() || 'Jordan Davis';
    const email = document.getElementById('profile-email').value.trim() || 'jordan@example.com';
    const location = document.getElementById('profile-location').value.trim() || 'New York, NY';

    updateUserProfile(fullName, email);
    const locationField = document.getElementById('profile-location');
    if (locationField) {
      locationField.value = location;
    }
    profileStatus.textContent = 'Your profile was updated successfully.';
  });
}

function initSavedJobsFromButtons() {
  saveButtons.forEach((button) => {
    const title = button.dataset.saveTitle;
    const company = button.dataset.company;
    const existing = savedJobs.some((job) => job.title === title && job.company === company);
    if (existing) {
      button.classList.add('saved');
      button.textContent = '♥';
      button.setAttribute('aria-label', `Unsave ${title}`);
    }
  });
}

renderSavedJobs();
initSavedJobsFromButtons();
setActiveView(activeView);
showLanding();
