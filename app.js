document.addEventListener("DOMContentLoaded", () => {

    const landingPage = document.querySelector(".landing-page");
    const dashboard = document.querySelector("#dashboard");
    const authBackdrop = document.querySelector("[data-auth-backdrop]");

    // Hide everything at startup
    if (landingPage) landingPage.hidden = true;
    if (dashboard) dashboard.hidden = true;
    if (authBackdrop) authBackdrop.hidden = true;


    // =========================================================
    // STORAGE
    // =========================================================

    function getUser() {
        const user = localStorage.getItem("careerlyUser");

        try {
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    }

    function getRegisteredAccount() {
        const account = localStorage.getItem("careerlyAccount");

        try {
            return account ? JSON.parse(account) : null;
        } catch {
            return null;
        }
    }

    function getProfile() {
        const profile = localStorage.getItem("careerlyProfile");

        try {
            return profile ? JSON.parse(profile) : null;
        } catch {
            return null;
        }
    }

    function saveProfile(profile) {
        localStorage.setItem(
            "careerlyProfile",
            JSON.stringify(profile)
        );
    }

    function getSettings() {
        const settings = localStorage.getItem("careerlySettings");

        try {
            return settings
                ? JSON.parse(settings)
                : {
                    emailNotifications: true,
                    jobAlerts: true,
                    applicationUpdates: true,
                    profileVisibility: true
                };
        } catch {
            return {
                emailNotifications: true,
                jobAlerts: true,
                applicationUpdates: true,
                profileVisibility: true
            };
        }
    }

    function saveSettings(settings) {
        localStorage.setItem(
            "careerlySettings",
            JSON.stringify(settings)
        );
    }


    // =========================================================
    // SIGNUP SCREEN
    // =========================================================

    function createSignupScreen() {

        removeSignupScreen();
        removeLoginScreen();
        removeProfileScreen();
        removeSettingsScreen();

        const signupScreen = document.createElement("div");
        signupScreen.id = "signup-screen";

        signupScreen.innerHTML = `
            <div class="signup-container">

                <div class="signup-left">

                    <div class="signup-brand">
                        Careerly
                    </div>

                    <div class="signup-content">

                        <span class="signup-label">
                            GET STARTED
                        </span>

                        <h1>
                            Create your<br>
                            Careerly account.
                        </h1>

                        <p>
                            Find opportunities that fit your skills,
                            goals, and the way you want to work.
                        </p>

                        <form id="signup-screen-form">

                            <label for="signup-name">
                                Full name
                            </label>

                            <input
                                type="text"
                                id="signup-name"
                                name="signupName"
                                placeholder="Enter your full name"
                                autocomplete="name"
                                required
                            >

                            <label for="signup-email">
                                Email address
                            </label>

                            <input
                                type="email"
                                id="signup-email"
                                name="signupEmail"
                                placeholder="you@example.com"
                                autocomplete="email"
                                required
                            >

                            <label for="signup-password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="signup-password"
                                name="signupPassword"
                                placeholder="At least 6 characters"
                                minlength="6"
                                autocomplete="new-password"
                                required
                            >

                            <p id="signup-error" class="signup-error"></p>

                            <button
                                type="submit"
                                class="signup-submit"
                            >
                                Create account
                            </button>

                        </form>

                        <p class="signup-login-text">
                            Already have an account?

                            <button
                                type="button"
                                id="go-to-login"
                            >
                                Log in
                            </button>
                        </p>

                    </div>
                </div>

                <div class="signup-right">

                    <div class="signup-art">

                        <div class="art-circle art-circle-one"></div>
                        <div class="art-circle art-circle-two"></div>

                        <div class="art-card art-card-one">
                            <span>✓</span>
                            Find your next opportunity
                        </div>

                        <div class="art-card art-card-two">
                            <span>★</span>
                            Work that feels like you
                        </div>

                        <div class="art-person"></div>

                    </div>

                </div>

            </div>
        `;

        document.body.appendChild(signupScreen);

        injectSignupStyles();

        const form =
            document.querySelector("#signup-screen-form");

        if (form) {
            form.addEventListener("submit", handleSignup);
        }

        const loginButton =
            document.querySelector("#go-to-login");

        if (loginButton) {
            loginButton.addEventListener(
                "click",
                createLoginScreen
            );
        }
    }


    // =========================================================
    // LOGIN SCREEN
    // =========================================================

    function createLoginScreen() {

        removeSignupScreen();
        removeLoginScreen();
        removeProfileScreen();
        removeSettingsScreen();

        const loginScreen = document.createElement("div");
        loginScreen.id = "login-screen";

        loginScreen.innerHTML = `
            <div class="login-container">

                <div class="login-left">

                    <div class="login-brand">
                        Careerly
                    </div>

                    <div class="login-content">

                        <span class="login-label">
                            WELCOME BACK
                        </span>

                        <h1>
                            Welcome<br>
                            back.
                        </h1>

                        <p>
                            Log in to continue your journey
                            toward work that feels like you.
                        </p>

                        <form id="login-screen-form">

                            <label for="login-email">
                                Email address
                            </label>

                            <input
                                type="email"
                                id="login-email"
                                name="loginEmail"
                                placeholder="you@example.com"
                                autocomplete="email"
                                required
                            >

                            <label for="login-password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="login-password"
                                name="loginPassword"
                                placeholder="Enter your password"
                                autocomplete="current-password"
                                required
                            >

                            <p id="login-error" class="login-error"></p>

                            <button
                                type="submit"
                                class="login-submit"
                            >
                                Log in
                            </button>

                        </form>

                        <p class="login-signup-text">
                            Don't have an account?

                            <button
                                type="button"
                                id="go-to-signup"
                            >
                                Create account
                            </button>
                        </p>

                    </div>
                </div>

                <div class="login-right">

                    <div class="login-art">

                        <div class="login-circle login-circle-one"></div>
                        <div class="login-circle login-circle-two"></div>

                        <div class="login-card login-card-one">
                            <span>✓</span>
                            Your career starts here
                        </div>

                        <div class="login-card login-card-two">
                            <span>★</span>
                            Discover new possibilities
                        </div>

                        <div class="login-person"></div>

                    </div>

                </div>

            </div>
        `;

        document.body.appendChild(loginScreen);

        injectLoginStyles();

        const form =
            document.querySelector("#login-screen-form");

        if (form) {
            form.addEventListener("submit", handleLogin);
        }

        const signupButton =
            document.querySelector("#go-to-signup");

        if (signupButton) {
            signupButton.addEventListener(
                "click",
                createSignupScreen
            );
        }
    }


    // =========================================================
    // SIGNUP
    // =========================================================

    function handleSignup(event) {

        event.preventDefault();

        const form = event.currentTarget;

        const nameInput =
            form.querySelector("#signup-name");

        const emailInput =
            form.querySelector("#signup-email");

        const passwordInput =
            form.querySelector("#signup-password");

        const error =
            form.querySelector("#signup-error");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        error.textContent = "";

        if (name.length < 2) {
            error.textContent =
                "Please enter your full name.";

            nameInput.focus();
            return;
        }

        if (!emailInput.checkValidity()) {
            error.textContent =
                "Please enter a valid email address.";

            emailInput.focus();
            return;
        }

        if (password.length < 6) {
            error.textContent =
                "Password must be at least 6 characters.";

            passwordInput.focus();
            return;
        }

        const account = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(
            "careerlyAccount",
            JSON.stringify(account)
        );

        // Create default profile
        const defaultProfile = {
            name: name,
            email: email,
            jobTitle: "Product Designer",
            location: "New York, NY",
            about:
                "I'm a creative professional looking for meaningful opportunities where I can grow, contribute, and do work that makes an impact.",
            skills: [
                "UI/UX Design",
                "Figma",
                "Prototyping",
                "User Research"
            ]
        };

        saveProfile(defaultProfile);

        createLoginScreen();

        const loginEmail =
            document.querySelector("#login-email");

        if (loginEmail) {

            loginEmail.value = email;

            setTimeout(() => {

                const loginPassword =
                    document.querySelector("#login-password");

                if (loginPassword) {
                    loginPassword.focus();
                }

            }, 50);
        }
    }


    // =========================================================
    // LOGIN
    // =========================================================

    function handleLogin(event) {

        event.preventDefault();

        const form = event.currentTarget;

        const emailInput =
            form.querySelector("#login-email");

        const passwordInput =
            form.querySelector("#login-password");

        const error =
            form.querySelector("#login-error");

        const email =
            emailInput.value.trim().toLowerCase();

        const password =
            passwordInput.value;

        error.textContent = "";

        const account = getRegisteredAccount();

        if (!account) {

            error.textContent =
                "No account found. Please create an account first.";

            return;
        }

        if (
            email !== account.email ||
            password !== account.password
        ) {

            error.textContent =
                "Incorrect email or password.";

            passwordInput.focus();

            return;
        }

        const user = {
            name: account.name,
            email: account.email
        };

        localStorage.setItem(
            "careerlyUser",
            JSON.stringify(user)
        );

        // Make sure profile exists
        if (!getProfile()) {

            saveProfile({
                name: account.name,
                email: account.email,
                jobTitle: "Product Designer",
                location: "New York, NY",
                about:
                    "I'm a creative professional looking for meaningful opportunities where I can grow, contribute, and do work that makes an impact.",
                skills: [
                    "UI/UX Design",
                    "Figma",
                    "Prototyping",
                    "User Research"
                ]
            });
        }

        showDashboard(user);
    }


    // =========================================================
    // SHOW DASHBOARD
    // =========================================================

    function showDashboard(user) {

        removeSignupScreen();
        removeLoginScreen();
        removeProfileScreen();
        removeSettingsScreen();

        if (landingPage) {
            landingPage.hidden = true;
        }

        if (authBackdrop) {
            authBackdrop.hidden = true;
        }

        if (dashboard) {
            dashboard.hidden = false;
        }

        updateUser(user);
        updateLoggedInNavigation();
        setupDashboardFunctions();
    }


    // =========================================================
    // UPDATE USER
    // =========================================================

    function updateUser(user) {

        if (!user) return;

        const profile = getProfile();

        const displayName =
            profile?.name || user.name;

        const displayEmail =
            profile?.email || user.email;

        document
            .querySelectorAll("[data-user-name]")
            .forEach(element => {
                element.textContent = displayName;
            });

        document
            .querySelectorAll("[data-user-email]")
            .forEach(element => {
                element.textContent = displayEmail;
            });

        const profileName =
            document.querySelector(".profile-card strong");

        if (profileName) {
            profileName.textContent = displayName;
        }

        const profileJob =
            document.querySelector(".profile-card span");

        if (profileJob) {
            profileJob.textContent =
                profile?.jobTitle || "Product Designer";
        }

        const initials =
            getInitials(displayName);

        document
            .querySelectorAll(".avatar, .mini-avatar")
            .forEach(avatar => {
                avatar.textContent = initials;
            });
    }


    function getInitials(name) {

        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(word =>
                word.charAt(0).toUpperCase()
            )
            .join("");
    }


    // =========================================================
    // LOGGED-IN NAVIGATION
    // =========================================================

    function updateLoggedInNavigation() {

        const guestActions =
            document.querySelector(".guest-actions");

        const memberActions =
            document.querySelector(".member-actions");

        if (guestActions) {
            guestActions.style.display = "none";
        }

        if (memberActions) {
            memberActions.style.display = "flex";
        }

        let signoutButton =
            document.querySelector("#top-signout");

        if (!signoutButton) {

            signoutButton =
                document.createElement("button");

            signoutButton.id = "top-signout";
            signoutButton.type = "button";
            signoutButton.textContent = "Sign out";

            signoutButton.style.cursor = "pointer";
            signoutButton.style.border = "none";
            signoutButton.style.background = "transparent";
            signoutButton.style.font = "inherit";
            signoutButton.style.color = "inherit";

            const memberActionsContainer =
                document.querySelector(".member-actions");

            if (memberActionsContainer) {

                memberActionsContainer.appendChild(
                    signoutButton
                );
            }
        }

        signoutButton.onclick = signOut;
    }


    // =========================================================
    // DASHBOARD FUNCTIONS
    // =========================================================

    function setupDashboardFunctions() {

        // -----------------------------------------------------
        // SAVE JOBS
        // -----------------------------------------------------

        document
            .querySelectorAll(".save-button")
            .forEach(button => {

                button.onclick = () => {

                    button.classList.toggle("saved");

                    if (button.classList.contains("saved")) {
                        button.textContent = "♥";
                    } else {
                        button.textContent = "♡";
                    }
                };
            });


        // -----------------------------------------------------
        // APPLY JOBS
        // -----------------------------------------------------

        document
            .querySelectorAll(".apply-button")
            .forEach(button => {

                button.onclick = () => {

                    if (button.disabled) return;

                    button.textContent =
                        "Applied ✓";

                    button.disabled = true;

                    button.style.cursor =
                        "default";

                    button.style.opacity =
                        "0.8";
                };
            });


        // -----------------------------------------------------
        // PROFILE DROPDOWN
        // -----------------------------------------------------

        const profileButton =
            document.querySelector(
                "[data-profile-menu]"
            );

        const profileMenu =
            document.querySelector(
                ".profile-menu"
            );

        if (profileButton && profileMenu) {

            profileButton.onclick = event => {

                event.stopPropagation();

                profileMenu.classList.toggle(
                    "visible"
                );
            };
        }


        // -----------------------------------------------------
        // CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
        // -----------------------------------------------------

        if (!window.careerlyProfileOutsideClick) {

            window.careerlyProfileOutsideClick =
                event => {

                    const button =
                        document.querySelector(
                            "[data-profile-menu]"
                        );

                    const menu =
                        document.querySelector(
                            ".profile-menu"
                        );

                    if (!button || !menu) return;

                    if (
                        !menu.contains(event.target) &&
                        !button.contains(event.target)
                    ) {

                        menu.classList.remove(
                            "visible"
                        );
                    }
                };

            document.addEventListener(
                "click",
                window.careerlyProfileOutsideClick
            );
        }


        // -----------------------------------------------------
        // SEARCH
        // -----------------------------------------------------

        const searchButton =
            document.querySelector(
                ".search-button"
            );

        const searchInput =
            document.querySelector(
                ".search-panel input"
            );

        if (searchButton && searchInput) {

            searchButton.onclick = () => {
                searchJobs(searchInput.value);
            };

            searchInput.onkeydown = event => {

                if (event.key === "Enter") {
                    searchJobs(searchInput.value);
                }
            };
        }


        // -----------------------------------------------------
        // FILTERS
        // -----------------------------------------------------

        document
            .querySelectorAll(".filter")
            .forEach(filter => {

                filter.onclick = () => {

                    document
                        .querySelectorAll(".filter")
                        .forEach(item => {
                            item.classList.remove(
                                "active"
                            );
                        });

                    filter.classList.add("active");

                    const filterText =
                        filter.textContent
                            .trim()
                            .toLowerCase();

                    filterJobs(filterText);
                };
            });


        // -----------------------------------------------------
        // EXISTING SIGNOUT
        // -----------------------------------------------------

        document
            .querySelectorAll("[data-signout]")
            .forEach(button => {

                button.onclick = signOut;
            });


        // -----------------------------------------------------
        // MY PROFILE
        // -----------------------------------------------------

        setupProfileNavigation();


        // -----------------------------------------------------
        // SETTINGS
        // -----------------------------------------------------

        setupSettingsNavigation();


        // -----------------------------------------------------
        // COMPLETE PROFILE LINKS
        // -----------------------------------------------------

        document
            .querySelectorAll(
                'a[href="#profile"]'
            )
            .forEach(link => {

                link.onclick = event => {

                    event.preventDefault();

                    openProfileScreen();
                };
            });

    }


    // =========================================================
    // MY PROFILE NAVIGATION
    // =========================================================

    function setupProfileNavigation() {

        document
            .querySelectorAll(
                '.nav-link[href="#profile"]'
            )
            .forEach(link => {

                link.onclick = event => {

                    event.preventDefault();

                    openProfileScreen();
                };
            });
    }


    // =========================================================
    // SETTINGS NAVIGATION
    // =========================================================

    function setupSettingsNavigation() {

        document
            .querySelectorAll(
                '.nav-link[href="#settings"]'
            )
            .forEach(link => {

                link.onclick = event => {

                    event.preventDefault();

                    openSettingsScreen();
                };
            });
    }


    // =========================================================
    // PROFILE SCREEN
    // =========================================================

    function openProfileScreen() {

        if (!dashboard) return;

        const user =
            getUser();

        if (!user) return;

        const profile =
            getProfile() || {
                name: user.name,
                email: user.email,
                jobTitle: "Product Designer",
                location: "New York, NY",
                about:
                    "Tell employers a little about yourself.",
                skills: [
                    "UI/UX Design",
                    "Figma",
                    "Prototyping"
                ]
            };

        saveProfile(profile);

        dashboard.hidden = true;

        removeSettingsScreen();
        removeProfileScreen();

        const screen =
            document.createElement("div");

        screen.id = "profile-screen";

        screen.innerHTML = `

            <div class="careerly-page">

                <header class="careerly-page-header">

                    <div>
                        <span class="careerly-page-label">
                            YOUR ACCOUNT
                        </span>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            Manage your professional information
                            and make your profile stand out.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="careerly-back-button"
                        id="profile-back-button"
                    >
                        ← Back to dashboard
                    </button>

                </header>


                <div class="careerly-profile-layout">

                    <section class="careerly-profile-card">

                        <div class="careerly-profile-avatar">
                            ${getInitials(profile.name)}
                        </div>

                        <h2 id="profile-preview-name">
                            ${escapeHTML(profile.name)}
                        </h2>

                        <p id="profile-preview-title">
                            ${escapeHTML(profile.jobTitle)}
                        </p>

                        <span id="profile-preview-location">
                            ${escapeHTML(profile.location)}
                        </span>

                        <div class="careerly-profile-divider"></div>

                        <div class="careerly-profile-stat">
                            <strong>82%</strong>
                            <span>Profile strength</span>
                        </div>

                    </section>


                    <section class="careerly-form-card">

                        <div class="careerly-card-heading">

                            <div>
                                <span>
                                    PROFILE INFORMATION
                                </span>

                                <h2>
                                    Personal details
                                </h2>
                            </div>

                            <span class="careerly-status">
                                ● Active
                            </span>

                        </div>


                        <form id="careerly-profile-form">

                            <div class="careerly-form-grid">

                                <div class="careerly-field">

                                    <label for="profile-name">
                                        Full name
                                    </label>

                                    <input
                                        id="profile-name"
                                        type="text"
                                        value="${escapeAttribute(profile.name)}"
                                        required
                                    >

                                </div>


                                <div class="careerly-field">

                                    <label for="profile-email">
                                        Email address
                                    </label>

                                    <input
                                        id="profile-email"
                                        type="email"
                                        value="${escapeAttribute(profile.email)}"
                                        required
                                    >

                                </div>


                                <div class="careerly-field">

                                    <label for="profile-job-title">
                                        Job title
                                    </label>

                                    <input
                                        id="profile-job-title"
                                        type="text"
                                        value="${escapeAttribute(profile.jobTitle)}"
                                        placeholder="e.g. Product Designer"
                                        required
                                    >

                                </div>


                                <div class="careerly-field">

                                    <label for="profile-location">
                                        Location
                                    </label>

                                    <input
                                        id="profile-location"
                                        type="text"
                                        value="${escapeAttribute(profile.location)}"
                                        placeholder="e.g. New York, NY"
                                        required
                                    >

                                </div>

                            </div>


                            <div class="careerly-field">

                                <label for="profile-about">
                                    About me
                                </label>

                                <textarea
                                    id="profile-about"
                                    rows="5"
                                    placeholder="Tell employers about yourself..."
                                >${escapeHTML(profile.about)}</textarea>

                            </div>


                            <div class="careerly-field">

                                <label>
                                    Skills
                                </label>

                                <input
                                    id="profile-skills"
                                    type="text"
                                    value="${escapeAttribute(profile.skills.join(", "))}"
                                    placeholder="UI/UX Design, Figma, HTML..."
                                >

                                <small>
                                    Separate each skill with a comma.
                                </small>

                            </div>


                            <div
                                id="profile-save-message"
                                class="careerly-save-message"
                            ></div>


                            <div class="careerly-form-actions">

                                <button
                                    type="button"
                                    class="careerly-cancel-button"
                                    id="profile-cancel-button"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    class="careerly-save-button"
                                >
                                    Save changes
                                </button>

                            </div>

                        </form>

                    </section>

                </div>

            </div>
        `;

        document.body.appendChild(screen);

        injectProfileStyles();

        const backButton =
            document.querySelector(
                "#profile-back-button"
            );

        if (backButton) {

            backButton.onclick =
                returnToDashboard;
        }


        const cancelButton =
            document.querySelector(
                "#profile-cancel-button"
            );

        if (cancelButton) {

            cancelButton.onclick =
                returnToDashboard;
        }


        const form =
            document.querySelector(
                "#careerly-profile-form"
            );

        if (form) {

            form.addEventListener(
                "submit",
                handleProfileSave
            );
        }
    }


    // =========================================================
    // SAVE PROFILE
    // =========================================================

    function handleProfileSave(event) {

        event.preventDefault();

        const name =
            document
                .querySelector("#profile-name")
                .value
                .trim();

        const email =
            document
                .querySelector("#profile-email")
                .value
                .trim()
                .toLowerCase();

        const jobTitle =
            document
                .querySelector("#profile-job-title")
                .value
                .trim();

        const location =
            document
                .querySelector("#profile-location")
                .value
                .trim();

        const about =
            document
                .querySelector("#profile-about")
                .value
                .trim();

        const skills =
            document
                .querySelector("#profile-skills")
                .value
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean);

        const message =
            document.querySelector(
                "#profile-save-message"
            );


        if (name.length < 2) {

            message.textContent =
                "Please enter your full name.";

            message.className =
                "careerly-save-message error";

            return;
        }


        if (
            !document
                .querySelector("#profile-email")
                .checkValidity()
        ) {

            message.textContent =
                "Please enter a valid email address.";

            message.className =
                "careerly-save-message error";

            return;
        }


        if (!jobTitle) {

            message.textContent =
                "Please enter your job title.";

            message.className =
                "careerly-save-message error";

            return;
        }


        const profile = {
            name,
            email,
            jobTitle,
            location,
            about,
            skills
        };

        saveProfile(profile);


        // Update account email/name too
        const account =
            getRegisteredAccount();

        if (account) {

            account.name = name;
            account.email = email;

            localStorage.setItem(
                "careerlyAccount",
                JSON.stringify(account)
            );
        }


        // Update logged-in session
        const user =
            getUser();

        if (user) {

            user.name = name;
            user.email = email;

            localStorage.setItem(
                "careerlyUser",
                JSON.stringify(user)
            );
        }


        updateUser(user);


        message.textContent =
            "Profile saved successfully!";

        message.className =
            "careerly-save-message success";


        setTimeout(() => {

            message.textContent = "";

        }, 3000);
    }


    // =========================================================
    // SETTINGS SCREEN
    // =========================================================

    function openSettingsScreen() {

        if (!dashboard) return;

        dashboard.hidden = true;

        removeProfileScreen();
        removeSettingsScreen();

        const settings =
            getSettings();

        const screen =
            document.createElement("div");

        screen.id = "settings-screen";

        screen.innerHTML = `

            <div class="careerly-page">

                <header class="careerly-page-header">

                    <div>
                        <span class="careerly-page-label">
                            YOUR ACCOUNT
                        </span>

                        <h1>
                            Settings
                        </h1>

                        <p>
                            Control your notifications,
                            job alerts, and profile preferences.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="careerly-back-button"
                        id="settings-back-button"
                    >
                        ← Back to dashboard
                    </button>

                </header>


                <div class="careerly-settings-layout">

                    <section class="careerly-settings-card">

                        <div class="careerly-card-heading">

                            <div>
                                <span>
                                    NOTIFICATIONS
                                </span>

                                <h2>
                                    Stay up to date
                                </h2>
                            </div>

                            <span class="careerly-settings-icon">
                                ♧
                            </span>

                        </div>


                        <div class="careerly-setting-row">

                            <div>
                                <strong>
                                    Email notifications
                                </strong>

                                <p>
                                    Receive important updates
                                    about your Careerly account.
                                </p>
                            </div>

                            <label class="careerly-toggle">

                                <input
                                    type="checkbox"
                                    id="setting-email-notifications"
                                    ${settings.emailNotifications ? "checked" : ""}
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="careerly-setting-row">

                            <div>
                                <strong>
                                    Job alerts
                                </strong>

                                <p>
                                    Get notified when new jobs
                                    match your preferences.
                                </p>
                            </div>

                            <label class="careerly-toggle">

                                <input
                                    type="checkbox"
                                    id="setting-job-alerts"
                                    ${settings.jobAlerts ? "checked" : ""}
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="careerly-setting-row">

                            <div>
                                <strong>
                                    Application updates
                                </strong>

                                <p>
                                    Receive updates about your
                                    applications and interviews.
                                </p>
                            </div>

                            <label class="careerly-toggle">

                                <input
                                    type="checkbox"
                                    id="setting-application-updates"
                                    ${settings.applicationUpdates ? "checked" : ""}
                                >

                                <span></span>

                            </label>

                        </div>

                    </section>


                    <section class="careerly-settings-card">

                        <div class="careerly-card-heading">

                            <div>
                                <span>
                                    PRIVACY
                                </span>

                                <h2>
                                    Profile visibility
                                </h2>
                            </div>

                            <span class="careerly-settings-icon">
                                ◎
                            </span>

                        </div>


                        <div class="careerly-setting-row">

                            <div>
                                <strong>
                                    Make my profile visible
                                </strong>

                                <p>
                                    Allow employers to discover
                                    your Careerly profile.
                                </p>
                            </div>

                            <label class="careerly-toggle">

                                <input
                                    type="checkbox"
                                    id="setting-profile-visibility"
                                    ${settings.profileVisibility ? "checked" : ""}
                                >

                                <span></span>

                            </label>

                        </div>

                    </section>


                    <section class="careerly-settings-card careerly-danger-card">

                        <div class="careerly-card-heading">

                            <div>
                                <span>
                                    ACCOUNT
                                </span>

                                <h2>
                                    Account information
                                </h2>
                            </div>

                        </div>

                        <p class="careerly-account-note">
                            Your Careerly account is stored locally
                            in this browser for this demo project.
                        </p>

                        <div class="careerly-account-info">

                            <span>
                                Current account
                            </span>

                            <strong>
                                ${escapeHTML(
                                    getUser()?.email || "Not signed in"
                                )}
                            </strong>

                        </div>

                    </section>


                    <div
                        id="settings-save-message"
                        class="careerly-save-message"
                    ></div>


                    <div class="careerly-form-actions settings-actions">

                        <button
                            type="button"
                            class="careerly-cancel-button"
                            id="settings-reset-button"
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            class="careerly-save-button"
                            id="settings-save-button"
                        >
                            Save settings
                        </button>

                    </div>

                </div>

            </div>
        `;

        document.body.appendChild(screen);

        injectSettingsStyles();


        const backButton =
            document.querySelector(
                "#settings-back-button"
            );

        if (backButton) {

            backButton.onclick =
                returnToDashboard;
        }


        const saveButton =
            document.querySelector(
                "#settings-save-button"
            );

        if (saveButton) {

            saveButton.onclick =
                handleSettingsSave;
        }


        const resetButton =
            document.querySelector(
                "#settings-reset-button"
            );

        if (resetButton) {

            resetButton.onclick = () => {

                const confirmed =
                    confirm(
                        "Reset all settings to their default values?"
                    );

                if (!confirmed) return;

                document.querySelector(
                    "#setting-email-notifications"
                ).checked = true;

                document.querySelector(
                    "#setting-job-alerts"
                ).checked = true;

                document.querySelector(
                    "#setting-application-updates"
                ).checked = true;

                document.querySelector(
                    "#setting-profile-visibility"
                ).checked = true;
            };
        }
    }


    // =========================================================
    // SAVE SETTINGS
    // =========================================================

    function handleSettingsSave() {

        const settings = {

            emailNotifications:
                document.querySelector(
                    "#setting-email-notifications"
                ).checked,

            jobAlerts:
                document.querySelector(
                    "#setting-job-alerts"
                ).checked,

            applicationUpdates:
                document.querySelector(
                    "#setting-application-updates"
                ).checked,

            profileVisibility:
                document.querySelector(
                    "#setting-profile-visibility"
                ).checked
        };

        saveSettings(settings);

        const message =
            document.querySelector(
                "#settings-save-message"
            );

        message.textContent =
            "Settings saved successfully!";

        message.className =
            "careerly-save-message success";

        setTimeout(() => {

            message.textContent = "";

        }, 3000);
    }


    // =========================================================
    // RETURN TO DASHBOARD
    // =========================================================

    function returnToDashboard() {

        removeProfileScreen();
        removeSettingsScreen();

        if (dashboard) {
            dashboard.hidden = false;
        }

        const user =
            getUser();

        if (user) {
            updateUser(user);
            updateLoggedInNavigation();
            setupDashboardFunctions();
        }
    }


    // =========================================================
    // SEARCH
    // =========================================================

    function searchJobs(searchTerm) {

        const term =
            searchTerm
                .trim()
                .toLowerCase();

        document
            .querySelectorAll(".job-card")
            .forEach(card => {

                const text =
                    card.textContent.toLowerCase();

                card.style.display =
                    !term || text.includes(term)
                        ? ""
                        : "none";
            });
    }


    // =========================================================
    // FILTER JOBS
    // =========================================================

    function filterJobs(filterName) {

        const cards =
            document.querySelectorAll(
                ".job-card"
            );

        cards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            let show = true;

            if (filterName === "remote") {

                show =
                    text.includes("remote");
            }

            else if (filterName === "on-site") {

                show =
                    text.includes("on-site") ||
                    text.includes("onsite");
            }

            else if (filterName === "full-time") {

                show =
                    text.includes("full-time") ||
                    text.includes("full time");
            }

            else if (filterName === "all jobs") {

                show = true;
            }

            // "Filters" button should not hide jobs
            else if (filterName === "filters") {

                show = true;
            }

            card.style.display =
                show ? "" : "none";
        });
    }


    // =========================================================
    // LOGOUT
    // =========================================================

    function signOut() {

        localStorage.removeItem(
            "careerlyUser"
        );

        removeProfileScreen();
        removeSettingsScreen();

        if (dashboard) {
            dashboard.hidden = true;
        }

        const profileMenu =
            document.querySelector(
                ".profile-menu"
            );

        if (profileMenu) {
            profileMenu.classList.remove(
                "visible"
            );
        }

        const signoutButton =
            document.querySelector(
                "#top-signout"
            );

        if (signoutButton) {
            signoutButton.remove();
        }

        const guestActions =
            document.querySelector(
                ".guest-actions"
            );

        if (guestActions) {
            guestActions.style.display = "";
        }

        const memberActions =
            document.querySelector(
                ".member-actions"
            );

        if (memberActions) {
            memberActions.style.display = "";
        }

        createLoginScreen();
    }


    // =========================================================
    // REMOVE SCREENS
    // =========================================================

    function removeSignupScreen() {

        const screen =
            document.querySelector(
                "#signup-screen"
            );

        if (screen) {
            screen.remove();
        }

        const style =
            document.querySelector(
                "#signup-screen-style"
            );

        if (style) {
            style.remove();
        }
    }


    function removeLoginScreen() {

        const screen =
            document.querySelector(
                "#login-screen"
            );

        if (screen) {
            screen.remove();
        }

        const style =
            document.querySelector(
                "#login-screen-style"
            );

        if (style) {
            style.remove();
        }
    }


    function removeProfileScreen() {

        const screen =
            document.querySelector(
                "#profile-screen"
            );

        if (screen) {
            screen.remove();
        }

        const style =
            document.querySelector(
                "#careerly-profile-style"
            );

        if (style) {
            style.remove();
        }
    }


    function removeSettingsScreen() {

        const screen =
            document.querySelector(
                "#settings-screen"
            );

        if (screen) {
            screen.remove();
        }

        const style =
            document.querySelector(
                "#careerly-settings-style"
            );

        if (style) {
            style.remove();
        }
    }


    // =========================================================
    // ESCAPE HTML
    // =========================================================

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function escapeAttribute(value) {
        return escapeHTML(value);
    }


    // =========================================================
    // PROFILE SCREEN STYLES
    // =========================================================

    function injectProfileStyles() {

        if (
            document.querySelector(
                "#careerly-profile-style"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id =
            "careerly-profile-style";

        style.textContent = `

            #profile-screen {
                position: fixed;
                inset: 0;
                z-index: 9999;
                overflow-y: auto;
                background: #f6f7f3;
                color: #27323b;
                font-family:
                    "Trebuchet MS",
                    "Segoe UI",
                    sans-serif;
            }

            .careerly-page {
                width: min(1120px, calc(100% - 50px));
                margin: 0 auto;
                padding: 55px 0 70px;
            }

            .careerly-page-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 30px;
                margin-bottom: 35px;
            }

            .careerly-page-label {
                color: #63917a;
                font-size: 10px;
                font-weight: 800;
                letter-spacing: .12em;
            }

            .careerly-page-header h1 {
                margin: 8px 0 8px;
                color: #264d41;
                font: 400 43px Georgia, serif;
                letter-spacing: -1.5px;
            }

            .careerly-page-header p {
                max-width: 500px;
                margin: 0;
                color: #7b8588;
                font-size: 12px;
                line-height: 1.6;
            }

            .careerly-back-button {
                min-height: 40px;
                padding: 0 17px;
                border: 1px solid #d8e3db;
                border-radius: 8px;
                color: #287b5c;
                background: white;
                cursor: pointer;
                font-size: 10px;
                font-weight: 700;
            }

            .careerly-back-button:hover {
                background: #edf7f0;
            }

            .careerly-profile-layout {
                display: grid;
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 25px;
                align-items: start;
            }

            .careerly-profile-card,
            .careerly-form-card {
                border: 1px solid #e6e9e5;
                border-radius: 14px;
                background: #fff;
            }

            .careerly-profile-card {
                padding: 30px 24px;
                text-align: center;
            }

            .careerly-profile-avatar {
                display: grid;
                place-items: center;
                width: 82px;
                height: 82px;
                margin: 0 auto 18px;
                color: white;
                background: #88b8a5;
                border-radius: 50%;
                font-size: 23px;
                font-weight: 700;
            }

            .careerly-profile-card h2 {
                margin: 0;
                color: #29383c;
                font: 600 20px Georgia, serif;
            }

            .careerly-profile-card > p {
                margin: 8px 0 4px;
                color: #287b5c;
                font-size: 11px;
                font-weight: 700;
            }

            .careerly-profile-card > span {
                color: #929d99;
                font-size: 10px;
            }

            .careerly-profile-divider {
                height: 1px;
                margin: 25px 0;
                background: #e6e9e5;
            }

            .careerly-profile-stat strong {
                display: block;
                color: #287b5c;
                font: 600 25px Georgia, serif;
            }

            .careerly-profile-stat span {
                display: block;
                margin-top: 4px;
                color: #9aa39f;
                font-size: 9px;
            }

            .careerly-form-card {
                padding: 28px;
            }

            .careerly-card-heading {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 25px;
            }

            .careerly-card-heading > div > span {
                color: #8ca097;
                font-size: 9px;
                font-weight: 800;
                letter-spacing: .1em;
            }

            .careerly-card-heading h2 {
                margin: 5px 0 0;
                color: #34413f;
                font: 600 19px Georgia, serif;
            }

            .careerly-status {
                padding: 7px 10px;
                border-radius: 20px;
                color: #39825f;
                background: #e9f5ec;
                font-size: 9px;
                font-weight: 700;
            }

            .careerly-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 17px;
            }

            .careerly-field {
                display: flex;
                flex-direction: column;
                gap: 7px;
                margin-bottom: 17px;
            }

            .careerly-field label {
                color: #62706b;
                font-size: 10px;
                font-weight: 700;
            }

            .careerly-field input,
            .careerly-field textarea {
                width: 100%;
                padding: 12px 13px;
                border: 1px solid #dfe5e0;
                border-radius: 8px;
                outline: none;
                color: #27323b;
                background: #fff;
                font-size: 11px;
                resize: vertical;
            }

            .careerly-field input {
                min-height: 42px;
            }

            .careerly-field input:focus,
            .careerly-field textarea:focus {
                border-color: #6bb18e;
                box-shadow: 0 0 0 3px #e4f3e8;
            }

            .careerly-field small {
                color: #9aa39f;
                font-size: 9px;
            }

            .careerly-form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 5px;
            }

            .careerly-cancel-button,
            .careerly-save-button {
                min-height: 39px;
                padding: 0 17px;
                border-radius: 7px;
                cursor: pointer;
                font-size: 10px;
                font-weight: 700;
            }

            .careerly-cancel-button {
                border: 1px solid #dfe5e0;
                color: #788680;
                background: white;
            }

            .careerly-save-button {
                border: 0;
                color: white;
                background: #287b5c;
            }

            .careerly-save-message {
                min-height: 15px;
                margin: 5px 0 12px;
                font-size: 10px;
                font-weight: 700;
            }

            .careerly-save-message.success {
                color: #39825f;
            }

            .careerly-save-message.error {
                color: #d9534f;
            }

            @media (max-width: 800px) {

                .careerly-profile-layout {
                    grid-template-columns: 1fr;
                }

                .careerly-profile-card {
                    text-align: left;
                }

                .careerly-profile-avatar {
                    margin-left: 0;
                }

            }

            @media (max-width: 600px) {

                .careerly-page {
                    width: calc(100% - 30px);
                    padding: 30px 0 45px;
                }

                .careerly-page-header {
                    flex-direction: column;
                }

                .careerly-page-header h1 {
                    font-size: 35px;
                }

                .careerly-form-grid {
                    grid-template-columns: 1fr;
                    gap: 0;
                }

                .careerly-form-card {
                    padding: 20px;
                }

                .careerly-form-actions {
                    flex-direction: column-reverse;
                }

                .careerly-cancel-button,
                .careerly-save-button {
                    width: 100%;
                }
            }

        `;

        document.head.appendChild(style);
    }


    // =========================================================
    // SETTINGS SCREEN STYLES
    // =========================================================

    function injectSettingsStyles() {

        if (
            document.querySelector(
                "#careerly-settings-style"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id =
            "careerly-settings-style";

        style.textContent = `

            #settings-screen {
                position: fixed;
                inset: 0;
                z-index: 9999;
                overflow-y: auto;
                background: #f6f7f3;
                color: #27323b;
                font-family:
                    "Trebuchet MS",
                    "Segoe UI",
                    sans-serif;
            }

            .careerly-settings-layout {
                display: grid;
                gap: 17px;
                max-width: 850px;
            }

            .careerly-settings-card {
                padding: 26px 28px;
                border: 1px solid #e6e9e5;
                border-radius: 14px;
                background: white;
            }

            .careerly-settings-card .careerly-card-heading {
                margin-bottom: 8px;
            }

            .careerly-settings-icon {
                display: grid;
                place-items: center;
                width: 35px;
                height: 35px;
                color: #287b5c;
                background: #edf7f0;
                border-radius: 9px;
                font-size: 16px;
            }

            .careerly-setting-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
                padding: 19px 0;
                border-top: 1px solid #edf0ed;
            }

            .careerly-setting-row strong {
                display: block;
                color: #4b5956;
                font-size: 11px;
            }

            .careerly-setting-row p {
                max-width: 550px;
                margin: 5px 0 0;
                color: #929d99;
                font-size: 9px;
                line-height: 1.5;
            }

            .careerly-toggle {
                position: relative;
                display: block;
                width: 43px;
                height: 23px;
                flex: 0 0 auto;
            }

            .careerly-toggle input {
                width: 0;
                height: 0;
                opacity: 0;
            }

            .careerly-toggle span {
                position: absolute;
                inset: 0;
                border-radius: 20px;
                background: #dfe5e1;
                cursor: pointer;
                transition: .2s;
            }

            .careerly-toggle span::before {
                content: "";
                position: absolute;
                left: 3px;
                top: 3px;
                width: 17px;
                height: 17px;
                border-radius: 50%;
                background: white;
                box-shadow: 0 1px 3px rgba(0,0,0,.15);
                transition: .2s;
            }

            .careerly-toggle input:checked + span {
                background: #287b5c;
            }

            .careerly-toggle input:checked + span::before {
                transform: translateX(20px);
            }

            .careerly-danger-card {
                background: #fff;
            }

            .careerly-account-note {
                margin: 0 0 15px;
                color: #8b9692;
                font-size: 10px;
                line-height: 1.5;
            }

            .careerly-account-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
                padding: 13px;
                border-radius: 8px;
                background: #f5f8f5;
            }

            .careerly-account-info span {
                color: #929d99;
                font-size: 9px;
            }

            .careerly-account-info strong {
                color: #53605c;
                font-size: 10px;
            }

            .settings-actions {
                justify-content: flex-end;
                padding-bottom: 30px;
            }

            @media (max-width: 600px) {

                .careerly-settings-card {
                    padding: 21px;
                }

                .careerly-setting-row {
                    align-items: flex-start;
                }

                .careerly-account-info {
                    align-items: flex-start;
                    flex-direction: column;
                }

                .settings-actions {
                    flex-direction: column-reverse;
                }

                .settings-actions button {
                    width: 100%;
                }
            }

        `;

        document.head.appendChild(style);
    }


    // =========================================================
    // SIGNUP STYLES
    // =========================================================

    function injectSignupStyles() {

        if (
            document.querySelector(
                "#signup-screen-style"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id =
            "signup-screen-style";

        style.textContent = `

            #signup-screen {
                position: fixed;
                inset: 0;
                z-index: 99999;
                background: #ffffff;
                font-family: Trebuchet MS, Segoe UI, sans-serif;
                color: #27323b;
            }

            .signup-container {
                width: 100%;
                height: 100%;
                display: flex;
            }

            .signup-left {
                width: 50%;
                padding: 40px 8%;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                overflow-y: auto;
            }

            .signup-brand {
                color: #287b5c;
                font-size: 25px;
                font-weight: bold;
            }

            .signup-content {
                width: 100%;
                max-width: 480px;
                margin: auto;
            }

            .signup-label {
                color: #287b5c;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 2px;
            }

            .signup-content h1 {
                font-size: clamp(38px, 4vw, 58px);
                line-height: 1.05;
                margin: 15px 0;
            }

            .signup-content > p {
                color: #7b8588;
                line-height: 1.6;
                margin-bottom: 30px;
            }

            #signup-screen-form {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            #signup-screen-form label {
                font-size: 14px;
                font-weight: bold;
                margin-top: 8px;
            }

            #signup-screen-form input {
                padding: 14px 16px;
                border: 1px solid #e6e9e5;
                border-radius: 8px;
                outline: none;
                font-size: 15px;
                box-sizing: border-box;
            }

            #signup-screen-form input:focus {
                border-color: #287b5c;
            }

            .signup-error {
                color: #d9534f !important;
                font-size: 13px;
                margin: 8px 0 !important;
            }

            .signup-submit {
                margin-top: 10px;
                padding: 15px;
                border: none;
                border-radius: 8px;
                background: #287b5c;
                color: white;
                font-size: 15px;
                font-weight: bold;
                cursor: pointer;
            }

            .signup-submit:hover {
                opacity: 0.9;
            }

            .signup-login-text {
                text-align: center;
                font-size: 14px;
                margin-top: 22px !important;
            }

            .signup-login-text button {
                border: none;
                background: none;
                color: #287b5c;
                font-weight: bold;
                cursor: pointer;
            }

            .signup-right {
                width: 50%;
                background: #eef6f1;
                overflow: hidden;
            }

            .signup-art {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .art-circle {
                position: absolute;
                border-radius: 50%;
                background: #d5e9dc;
            }

            .art-circle-one {
                width: 420px;
                height: 420px;
                top: 10%;
                right: 5%;
            }

            .art-circle-two {
                width: 240px;
                height: 240px;
                bottom: 5%;
                left: 5%;
                background: #f4d6cd;
            }

            .art-card {
                position: absolute;
                background: white;
                padding: 18px 22px;
                border-radius: 12px;
                box-shadow: 0 15px 40px rgba(0,0,0,.08);
                font-weight: bold;
                z-index: 3;
            }

            .art-card span {
                color: #287b5c;
                margin-right: 8px;
            }

            .art-card-one {
                top: 30%;
                left: 15%;
            }

            .art-card-two {
                bottom: 27%;
                right: 12%;
            }

            .art-person {
                position: absolute;
                width: 220px;
                height: 330px;
                background: #ec765e;
                border-radius: 110px 110px 20px 20px;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            @media (max-width: 750px) {

                .signup-left {
                    width: 100%;
                    padding: 30px;
                }

                .signup-right {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);
    }


    // =========================================================
    // LOGIN STYLES
    // =========================================================

    function injectLoginStyles() {

        if (
            document.querySelector(
                "#login-screen-style"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id =
            "login-screen-style";

        style.textContent = `

            #login-screen {
                position: fixed;
                inset: 0;
                z-index: 99999;
                background: #ffffff;
                font-family: Trebuchet MS, Segoe UI, sans-serif;
                color: #27323b;
            }

            .login-container {
                width: 100%;
                height: 100%;
                display: flex;
            }

            .login-left {
                width: 50%;
                padding: 40px 8%;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                overflow-y: auto;
            }

            .login-brand {
                color: #287b5c;
                font-size: 25px;
                font-weight: bold;
            }

            .login-content {
                width: 100%;
                max-width: 480px;
                margin: auto;
            }

            .login-label {
                color: #287b5c;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 2px;
            }

            .login-content h1 {
                font-size: clamp(42px, 4vw, 62px);
                line-height: 1.05;
                margin: 15px 0;
            }

            .login-content > p {
                color: #7b8588;
                line-height: 1.6;
                margin-bottom: 30px;
            }

            #login-screen-form {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            #login-screen-form label {
                font-size: 14px;
                font-weight: bold;
                margin-top: 8px;
            }

            #login-screen-form input {
                padding: 14px 16px;
                border: 1px solid #e6e9e5;
                border-radius: 8px;
                outline: none;
                font-size: 15px;
                box-sizing: border-box;
            }

            #login-screen-form input:focus {
                border-color: #287b5c;
            }

            .login-error {
                color: #d9534f !important;
                font-size: 13px;
                margin: 8px 0 !important;
            }

            .login-submit {
                margin-top: 10px;
                padding: 15px;
                border: none;
                border-radius: 8px;
                background: #287b5c;
                color: white;
                font-size: 15px;
                font-weight: bold;
                cursor: pointer;
            }

            .login-submit:hover {
                opacity: 0.9;
            }

            .login-signup-text {
                text-align: center;
                font-size: 14px;
                margin-top: 22px !important;
            }

            .login-signup-text button {
                border: none;
                background: none;
                color: #287b5c;
                font-weight: bold;
                cursor: pointer;
            }

            .login-right {
                width: 50%;
                background: #f8f1ee;
                overflow: hidden;
            }

            .login-art {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .login-circle {
                position: absolute;
                border-radius: 50%;
            }

            .login-circle-one {
                width: 450px;
                height: 450px;
                top: 8%;
                right: 8%;
                background: #f3d8d0;
            }

            .login-circle-two {
                width: 250px;
                height: 250px;
                bottom: 5%;
                left: 4%;
                background: #d5e9dc;
            }

            .login-card {
                position: absolute;
                background: white;
                padding: 18px 22px;
                border-radius: 12px;
                box-shadow: 0 15px 40px rgba(0,0,0,.08);
                font-weight: bold;
                z-index: 3;
            }

            .login-card span {
                color: #ec765e;
                margin-right: 8px;
            }

            .login-card-one {
                top: 30%;
                left: 12%;
            }

            .login-card-two {
                bottom: 27%;
                right: 10%;
            }

            .login-person {
                position: absolute;
                width: 220px;
                height: 330px;
                background: #287b5c;
                border-radius: 110px 110px 20px 20px;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            @media (max-width: 750px) {

                .login-left {
                    width: 100%;
                    padding: 30px;
                }

                .login-right {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);
    }


    // =========================================================
    // EXISTING AUTH MODAL
    // =========================================================

    function setupExistingAuth() {

        const openAuthButtons =
            document.querySelectorAll(
                "[data-open-auth]"
            );

        openAuthButtons.forEach(button => {

            button.onclick = () => {

                const mode =
                    button.getAttribute(
                        "data-open-auth"
                    );

                if (authBackdrop) {
                    authBackdrop.hidden = false;
                }

                switchAuthTab(mode);
            };
        });


        const closeButton =
            document.querySelector(
                "[data-close-auth]"
            );

        if (closeButton) {

            closeButton.onclick = () => {

                if (authBackdrop) {
                    authBackdrop.hidden = true;
                }
            };
        }


        if (authBackdrop) {

            authBackdrop.onclick = event => {

                if (
                    event.target === authBackdrop
                ) {
                    authBackdrop.hidden = true;
                }
            };
        }


        document
            .querySelectorAll("[data-auth-tab]")
            .forEach(tab => {

                tab.onclick = () => {

                    const mode =
                        tab.getAttribute(
                            "data-auth-tab"
                        );

                    switchAuthTab(mode);
                };
            });
    }


    // =========================================================
    // AUTH TAB SWITCHING
    // =========================================================

    function switchAuthTab(mode) {

        document
            .querySelectorAll("[data-auth-tab]")
            .forEach(tab => {

                tab.classList.toggle(
                    "active",
                    tab.getAttribute(
                        "data-auth-tab"
                    ) === mode
                );
            });

        // Your HTML uses data-auth-form
        const signInForm =
            document.querySelector(
                '[data-auth-form="signin"]'
            );

        const signUpForm =
            document.querySelector(
                '[data-auth-form="signup"]'
            );

        if (signInForm) {
            signInForm.hidden =
                mode !== "signin";
        }

        if (signUpForm) {
            signUpForm.hidden =
                mode !== "signup";
        }

        const title =
            document.querySelector(
                "#auth-title"
            );

        if (title) {

            title.textContent =
                mode === "signin"
                    ? "Welcome back"
                    : "Create your account";
        }
    }


    // =========================================================
    // START APPLICATION
    // =========================================================

    setupExistingAuth();

    const loggedInUser =
        getUser();

    if (loggedInUser) {

        showDashboard(loggedInUser);

    } else {

        createSignupScreen();
    }

});