const landingPage = document.querySelector('.landing-page');
const dashboard = document.getElementById('dashboard');
const authBackdrop = document.querySelector('.auth-backdrop');
const authStatus = document.querySelector('.auth-status');
const signInForm = document.querySelector('[data-auth-form="signin"]');
const signUpForm = document.querySelector('[data-auth-form="signup"]');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const navLinks = document.querySelectorAll('.nav-link');
const viewPanels = document.querySelectorAll('.dashboard-view');
const saveButtons = document.querySelectorAll('.save-button');
const miniAvatar = document.querySelector('[data-profile-menu]');
const profileMenu = document.querySelector('.profile-menu');
const userName = document.querySelector('[data-user-name]');
const userEmail = document.querySelector('[data-user-email]');
const savedCounter = document.querySelector('.saved-count');
const savedJobsList = document.getElementById('saved-jobs-list');
const savedJobsSummary = document.getElementById('saved-jobs-summary');
const profileForm = document.getElementById('profile-form');
const profileStatus = document.getElementById('profile-status');

let activeView = 'jobs';
let savedJobs = [
  { title: 'Brand Designer', company: 'Northstar', location: 'Remote', tag: 'north' },
  { title: 'Design Lead', company: 'Lumen Studio', location: 'Hybrid', tag: 'lumen' },
  { title: 'Senior Product Designer', company: 'Lumen Studio', location: 'New York, NY', tag: 'lumen' }
];

function setAuthTab(mode) {
  authTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.authTab === mode);
  });

  authForms.forEach((form) => {
    form.hidden = form.dataset.authForm !== mode;
  });
}

function openAuth(mode = 'signin') {
  if (!authBackdrop) return;
  authBackdrop.hidden = false;
  document.body.classList.add('modal-open');
  setAuthTab(mode);
  if (authStatus) authStatus.textContent = '';
}

function closeAuth() {
  if (!authBackdrop) return;
  authBackdrop.hidden = true;
  document.body.classList.remove('modal-open');
}

function showDashboard() {
  if (landingPage) landingPage.hidden = true;
  if (dashboard) dashboard.hidden = false;
}

function showLanding() {
  if (landingPage) landingPage.hidden = false;
  if (dashboard) dashboard.hidden = true;
}

function updateUserProfile(name, email) {
  const safeName = name || 'Jordan Davis';
  const safeEmail = email || 'jordan@example.com';

  if (userName) userName.textContent = safeName;
  if (userEmail) userEmail.textContent = safeEmail;

  document.querySelectorAll('.profile-card strong').forEach((element) => {
    element.textContent = safeName;
  });

  document.querySelectorAll('.avatar, .mini-avatar').forEach((avatar) => {
    const initials = safeName
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    avatar.textContent = initials;
  });
}

function setActiveView(viewName) {
  activeView = viewName;

  viewPanels.forEach((panel) => {
    const shouldShow = panel.dataset.view === viewName;
    panel.classList.toggle('hidden', !shouldShow);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.view === viewName);
  });
}

function renderSavedJobs() {
  if (!savedJobsList) return;

  savedJobsList.innerHTML = '';

  savedJobs.forEach((job) => {
    const article = document.createElement('article');
    article.className = 'saved-job-card';
    article.innerHTML = `
      <div class="small-logo logo-${job.tag}">${job.company.charAt(0)}</div>
      <div>
        <strong>${job.title}</strong>
        <span>${job.company} · ${job.location}</span>
      </div>
      <button type="button" class="inline-remove" data-remove-job="${job.title}">Remove</button>
    `;
    savedJobsList.appendChild(article);
  });

  if (savedCounter) savedCounter.textContent = savedJobs.length;
  if (savedJobsSummary) savedJobsSummary.textContent = `${savedJobs.length} jobs saved`;
}

function toggleSaveButton(button) {
  const title = button.dataset.saveTitle;
  const company = button.dataset.company;
  const location = button.dataset.location;
  const tag = button.dataset.tag;

  const isSaved = savedJobs.some((job) => job.title === title && job.company === company);

  if (isSaved) {
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

function initSavedButtons() {
  saveButtons.forEach((button) => {
    const title = button.dataset.saveTitle;
    const company = button.dataset.company;
    const isSaved = savedJobs.some((job) => job.title === title && job.company === company);

    if (isSaved) {
      button.classList.add('saved');
      button.textContent = '♥';
      button.setAttribute('aria-label', `Unsave ${title}`);
    }
  });
}

function signOut() {
  if (profileMenu) profileMenu.classList.remove('visible');
  updateUserProfile('Jordan Davis', 'jordan@example.com');
  showLanding();
  setActiveView('jobs');
}

function attachEvents() {
  authTabs.forEach((tab) => {
    tab.addEventListener('click', () => setAuthTab(tab.dataset.authTab));
  });

  document.querySelectorAll('[data-open-auth]').forEach((button) => {
    button.addEventListener('click', () => openAuth(button.dataset.openAuth));
  });

  const closeButton = document.querySelector('[data-close-auth]');
  if (closeButton) closeButton.addEventListener('click', closeAuth);

  if (authBackdrop) {
    authBackdrop.addEventListener('click', (event) => {
      if (event.target === authBackdrop) closeAuth();
    });
  }

  if (signInForm) {
    signInForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('signin-email').value.trim();
      const password = document.getElementById('signin-password').value.trim();

      if (!email || password.length < 6) {
        if (authStatus) authStatus.textContent = 'Please enter a valid email and password.';
        return;
      }

      if (authStatus) authStatus.textContent = 'Signing in...';
      updateUserProfile('Jordan Davis', email);
      closeAuth();
      showDashboard();
      setActiveView('jobs');
    });
  }

  if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();

      if (!name || !email || password.length < 6) {
        if (authStatus) authStatus.textContent = 'Please complete all fields with a valid password.';
        return;
      }

      if (authStatus) authStatus.textContent = 'Account created successfully!';
      updateUserProfile(name, email);
      closeAuth();
      showDashboard();
      setActiveView('jobs');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveView(link.dataset.view);
    });
  });

  if (miniAvatar) {
    miniAvatar.addEventListener('click', () => {
      if (profileMenu) profileMenu.classList.toggle('visible');
    });
  }

  document.addEventListener('click', (event) => {
    if (profileMenu && miniAvatar) {
      const clickedInside = profileMenu.contains(event.target) || miniAvatar.contains(event.target);
      if (!clickedInside) profileMenu.classList.remove('visible');
    }
  });

  const signOutButton = document.querySelector('[data-signout]');
  if (signOutButton) signOutButton.addEventListener('click', signOut);

  saveButtons.forEach((button) => {
    button.addEventListener('click', () => toggleSaveButton(button));
  });

  if (savedJobsList) {
    savedJobsList.addEventListener('click', (event) => {
      const removeButton = event.target.closest('[data-remove-job]');
      if (!removeButton) return;

      const title = removeButton.dataset.removeJob;
      savedJobs = savedJobs.filter((job) => job.title !== title);
      renderSavedJobs();

      const matchingButton = document.querySelector(`[data-save-title="${title}"]`);
      if (matchingButton) {
        matchingButton.classList.remove('saved');
        matchingButton.textContent = '♡';
        matchingButton.setAttribute('aria-label', `Save ${title}`);
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
      if (locationField) locationField.value = location;
      if (profileStatus) profileStatus.textContent = 'Your profile was updated successfully.';
    });
  }
}

attachEvents();
renderSavedJobs();
initSavedButtons();
setActiveView(activeView);
showLanding();
