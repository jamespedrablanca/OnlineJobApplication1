document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // MAIN ELEMENTS
    // =====================================================

    const landingPage = document.querySelector(".landing-page");
    const dashboard = document.querySelector("#dashboard");
    const authBackdrop = document.querySelector("[data-auth-backdrop]");

    const savedUser = localStorage.getItem("careerlyUser");


    // Hide original screens while JavaScript loads
    if (landingPage) landingPage.hidden = true;
    if (dashboard) dashboard.hidden = true;
    if (authBackdrop) authBackdrop.hidden = true;


    // =====================================================
    // CREATE FULL-SCREEN SIGNUP SCREEN
    // =====================================================

    function createSignupScreen() {

        // Prevent duplicate signup screens
        const existingScreen =
            document.querySelector("#signup-screen");

        if (existingScreen) {
            return;
        }


        const screen = document.createElement("div");

        screen.id = "signup-screen";

        screen.innerHTML = `
            <div class="signup-container">

                <div class="signup-logo">
                    <span>✦</span>
                    <strong>careerly</strong>
                </div>

                <div class="signup-content">

                    <p class="signup-eyebrow">
                        WELCOME TO CAREERLY
                    </p>

                    <h1>Create your account.</h1>

                    <p class="signup-description">
                        Start discovering meaningful opportunities and
                        take the next step in your career.
                    </p>

                    <form id="signup-screen-form">

                        <label for="screen-name">
                            Full name
                        </label>

                        <input
                            type="text"
                            id="screen-name"
                            placeholder="Jordan Davis"
                            autocomplete="name"
                            required
                        >

                        <label for="screen-email">
                            Email address
                        </label>

                        <input
                            type="email"
                            id="screen-email"
                            placeholder="you@example.com"
                            autocomplete="email"
                            required
                        >

                        <label for="screen-password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="screen-password"
                            placeholder="At least 6 characters"
                            minlength="6"
                            autocomplete="new-password"
                            required
                        >

                        <button type="submit">
                            Create account
                            <span>→</span>
                        </button>

                        <p id="signup-error"></p>

                    </form>

                </div>

                <div class="signup-decoration">

                    <div class="signup-sun"></div>

                    <div class="signup-card signup-card-back"></div>

                    <div class="signup-card signup-card-front">

                        <small>
                            YOUR NEXT ROLE
                        </small>

                        <strong>
                            Senior Product<br>
                            Designer
                        </strong>

                        <span>
                            Lumen Studio · New York
                        </span>

                    </div>

                    <span class="signup-star">
                        ✦
                    </span>

                </div>

            </div>
        `;


        // =================================================
        // SIGNUP SCREEN CSS
        // =================================================

        const style = document.createElement("style");

        style.id = "signup-screen-style";

        style.textContent = `

            #signup-screen {
                position: fixed;
                inset: 0;
                z-index: 9999;
                background: #f6f7f3;
                overflow-y: auto;
                font-family: "Trebuchet MS", "Segoe UI", sans-serif;
                color: #27323b;
            }

            .signup-container {
                min-height: 100vh;
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                gap: 70px;
                max-width: 1100px;
                margin: auto;
                padding: 45px;
                position: relative;
                box-sizing: border-box;
            }

            .signup-logo {
                position: absolute;
                top: 35px;
                left: 45px;
                display: flex;
                align-items: center;
                gap: 9px;
                font: 700 22px Georgia, serif;
            }

            .signup-logo span {
                display: grid;
                place-items: center;
                width: 28px;
                height: 28px;
                color: white;
                background: #ec765e;
                border-radius: 9px 9px 9px 2px;
                transform: rotate(-8deg);
                font: 16px Arial, sans-serif;
            }

            .signup-content {
                max-width: 430px;
                margin-top: 35px;
            }

            .signup-eyebrow {
                margin: 0 0 10px;
                color: #63917a;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: .1em;
            }

            .signup-content h1 {
                margin: 0;
                color: #264d41;
                font: 400 55px/.98 Georgia, serif;
                letter-spacing: -2px;
            }

            .signup-description {
                margin: 22px 0 28px;
                color: #788680;
                font-size: 13px;
                line-height: 1.7;
                max-width: 380px;
            }

            #signup-screen-form {
                display: grid;
                gap: 8px;
            }

            #signup-screen-form label {
                margin-top: 7px;
                color: #62706b;
                font-size: 10px;
                font-weight: 700;
            }

            #signup-screen-form input {
                width: 100%;
                height: 43px;
                padding: 0 12px;
                border: 1px solid #dfe5e0;
                border-radius: 7px;
                outline: none;
                background: white;
                color: #27323b;
                font-size: 11px;
                box-sizing: border-box;
            }

            #signup-screen-form input:focus {
                border-color: #6bb18e;
                box-shadow: 0 0 0 3px #e4f3e8;
            }

            #signup-screen-form button {
                height: 45px;
                margin-top: 13px;
                border: 0;
                border-radius: 7px;
                background: #287b5c;
                color: white;
                cursor: pointer;
                font-size: 11px;
                font-weight: 700;
                transition: .2s ease;
            }

            #signup-screen-form button:hover {
                background: #226a4f;
                transform: translateY(-1px);
            }

            #signup-screen-form button span {
                margin-left: 18px;
                font-size: 16px;
            }

            #signup-error {
                min-height: 12px;
                margin: 5px 0 0;
                color: #ec765e;
                font-size: 9px;
            }

            .signup-decoration {
                position: relative;
                min-height: 500px;
                background: #dcefe1;
                border-radius: 48% 48% 14px 14px;
                overflow: hidden;
            }

            .signup-sun {
                position: absolute;
                top: 65px;
                left: 25%;
                width: 180px;
                height: 180px;
                background: #f5b87e;
                border-radius: 50%;
            }

            .signup-card {
                position: absolute;
                border-radius: 12px;
            }

            .signup-card-back {
                top: 120px;
                left: 23%;
                width: 320px;
                height: 200px;
                background: #b7dac1;
                transform: rotate(9deg);
            }

            .signup-card-front {
                top: 145px;
                left: 18%;
                width: 320px;
                height: 210px;
                padding: 24px;
                background: white;
                box-shadow: 0 20px 36px rgba(44,79,62,.13);
                transform: rotate(-8deg);
                display: grid;
                box-sizing: border-box;
            }

            .signup-card-front small {
                color: #ec765e;
                font-size: 8px;
                font-weight: 800;
                letter-spacing: .12em;
            }

            .signup-card-front strong {
                color: #2b3b3c;
                font: 600 27px/1.03 Georgia, serif;
            }

            .signup-card-front span {
                align-self: end;
                color: #8b9892;
                font-size: 10px;
            }

            .signup-star {
                position: absolute;
                top: 100px;
                right: 17%;
                color: #ec765e;
                font-size: 24px;
            }

            @media (max-width: 750px) {

                .signup-container {
                    display: block;
                    padding: 30px 22px;
                }

                .signup-logo {
                    position: relative;
                    top: auto;
                    left: auto;
                    margin-bottom: 75px;
                }

                .signup-content {
                    margin: 0 auto;
                }

                .signup-content h1 {
                    font-size: 48px;
                }

                .signup-decoration {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(screen);


        // =================================================
        // SIGNUP FORM
        // =================================================

        const form =
            document.querySelector("#signup-screen-form");

        const nameInput =
            document.querySelector("#screen-name");

        const emailInput =
            document.querySelector("#screen-email");

        const passwordInput =
            document.querySelector("#screen-password");

        const error =
            document.querySelector("#signup-error");


        form.addEventListener("submit", (event) => {

            event.preventDefault();


            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;


            // Validation
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


            // Create user object
            const user = {
                name: name,
                email: email
            };


            // Save account
            localStorage.setItem(
                "careerlyUser",
                JSON.stringify(user)
            );


            // Remove signup screen
            screen.remove();


            // Show dashboard
            showDashboard(user);
        });
    }


    // =====================================================
    // SHOW DASHBOARD
    // =====================================================

    function showDashboard(user) {

        if (!dashboard) return;

        dashboard.hidden = false;

        updateUser(user);

        updateLoggedInNavigation();

        setupDashboardFunctions();
    }


    // =====================================================
    // UPDATE USER INFORMATION
    // =====================================================

    function updateUser(user) {

        if (!user) return;


        const nameElement =
            document.querySelector("[data-user-name]");

        const emailElement =
            document.querySelector("[data-user-email]");

        const profileName =
            document.querySelector(".profile-card strong");

        const avatar =
            document.querySelector(".avatar");

        const miniAvatar =
            document.querySelector(".mini-avatar");


        if (nameElement) {
            nameElement.textContent = user.name;
        }

        if (emailElement) {
            emailElement.textContent = user.email;
        }

        if (profileName) {
            profileName.textContent = user.name;
        }


        // Generate initials
        const initials = user.name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word.charAt(0).toUpperCase())
            .join("");


        if (avatar) {
            avatar.textContent = initials;
        }

        if (miniAvatar) {
            miniAvatar.textContent = initials;
        }
    }


    // =====================================================
    // LOGGED-IN NAVIGATION
    // =====================================================

    function updateLoggedInNavigation() {

        const guestActions =
            document.querySelector(".guest-actions");

        const memberActions =
            document.querySelector(".member-actions");

        const topActions =
            document.querySelector(".top-actions");


        // Hide Sign In / Create Account
        if (guestActions) {
            guestActions.style.display = "none";
        }


        // Show member area
        if (memberActions) {
            memberActions.style.display = "flex";
        }


        if (!topActions) return;


        // Prevent duplicate Sign Out buttons
        let signoutButton =
            document.querySelector("#top-signout");


        if (!signoutButton) {

            signoutButton =
                document.createElement("button");

            signoutButton.id = "top-signout";
            signoutButton.textContent = "Sign out";

            signoutButton.type = "button";

            signoutButton.style.cssText = `
                border: none;
                background: transparent;
                color: #6f7977;
                font-size: 11px;
                font-weight: 700;
                cursor: pointer;
                padding: 8px 4px;
            `;

            topActions.appendChild(signoutButton);

            signoutButton.addEventListener(
                "click",
                signOut
            );
        }
    }


    // =====================================================
    // DASHBOARD FUNCTIONS
    // =====================================================

    function setupDashboardFunctions() {


        // =================================================
        // SAVE JOBS
        // =================================================

        const saveButtons =
            document.querySelectorAll(".save-button");


        saveButtons.forEach(button => {

            if (button.dataset.jsReady === "true") {
                return;
            }

            button.dataset.jsReady = "true";


            button.addEventListener("click", () => {

                button.classList.toggle("saved");


                if (button.classList.contains("saved")) {

                    button.textContent = "♥";

                    button.style.color = "#ec765e";

                } else {

                    button.textContent = "♡";

                    button.style.color = "";
                }
            });
        });


        // =================================================
        // APPLY BUTTONS
        // =================================================

        const applyButtons =
            document.querySelectorAll(".apply-button");


        applyButtons.forEach(button => {

            if (button.dataset.jsReady === "true") {
                return;
            }

            button.dataset.jsReady = "true";


            button.addEventListener("click", () => {

                if (button.classList.contains("applied")) {

                    button.textContent = "Applied ✓";

                    return;
                }


                button.classList.add("applied");

                button.textContent = "Applied ✓";

                button.style.background = "#6b9f83";

                button.style.cursor = "default";
            });
        });


        // =================================================
        // PROFILE MENU
        // =================================================

        const profileButton =
            document.querySelector("[data-profile-menu]");

        const profileMenu =
            document.querySelector(".profile-menu");


        if (profileButton && profileMenu) {

            if (profileButton.dataset.jsReady !== "true") {

                profileButton.dataset.jsReady = "true";


                profileButton.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();

                        profileMenu.classList.toggle("visible");
                    }
                );
            }
        }


        // Close profile menu when clicking elsewhere
        if (!document.body.dataset.profileListener) {

            document.body.dataset.profileListener = "true";


            document.addEventListener("click", () => {

                const menu =
                    document.querySelector(".profile-menu");

                if (menu) {
                    menu.classList.remove("visible");
                }
            });
        }


        // =================================================
        // JOB SEARCH
        // =================================================

        const searchButton =
            document.querySelector(".search-button");

        const searchInput =
            document.querySelector(
                '.search-field input[type="search"]'
            );


        if (searchButton && searchInput) {

            if (searchButton.dataset.jsReady !== "true") {

                searchButton.dataset.jsReady = "true";


                searchButton.addEventListener(
                    "click",
                    searchJobs
                );


                searchInput.addEventListener(
                    "keydown",
                    (event) => {

                        if (event.key === "Enter") {

                            event.preventDefault();

                            searchJobs();
                        }
                    }
                );
            }
        }


        // =================================================
        // JOB FILTERS
        // =================================================

        const filters =
            document.querySelectorAll(".filter");


        filters.forEach(filter => {

            if (filter.dataset.jsReady === "true") {
                return;
            }

            filter.dataset.jsReady = "true";


            filter.addEventListener("click", () => {

                filters.forEach(item =>
                    item.classList.remove("active")
                );

                filter.classList.add("active");

                filterJobs(filter.textContent.trim());
            });
        });


        // =================================================
        // EXISTING SIGN OUT BUTTON
        // =================================================

        const existingSignout =
            document.querySelector("[data-signout]");


        if (existingSignout) {

            if (existingSignout.dataset.jsReady !== "true") {

                existingSignout.dataset.jsReady = "true";

                existingSignout.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        signOut();
                    }
                );
            }
        }
    }


    // =====================================================
    // SEARCH JOBS
    // =====================================================

    function searchJobs() {

        const searchInput =
            document.querySelector(
                '.search-field input[type="search"]'
            );

        const jobCards =
            document.querySelectorAll(".job-card");


        if (!searchInput) return;


        const searchTerm =
            searchInput.value.trim().toLowerCase();


        jobCards.forEach(card => {

            const text =
                card.textContent.toLowerCase();


            if (!searchTerm || text.includes(searchTerm)) {

                card.style.display = "";

            } else {

                card.style.display = "none";
            }
        });
    }


    // =====================================================
    // FILTER JOBS
    // =====================================================

    function filterJobs(filterName) {

        const jobCards =
            document.querySelectorAll(".job-card");


        const filter =
            filterName.toLowerCase();


        jobCards.forEach(card => {

            const text =
                card.textContent.toLowerCase();


            if (
                filter.includes("all jobs") ||
                filter.includes("filters")
            ) {

                card.style.display = "";

                return;
            }


            if (filter.includes("remote")) {

                card.style.display =
                    text.includes("remote")
                        ? ""
                        : "none";

                return;
            }


            if (filter.includes("on-site")) {

                card.style.display =
                    text.includes("on-site")
                        ? ""
                        : "none";

                return;
            }


            if (filter.includes("full-time")) {

                card.style.display =
                    text.includes("full-time")
                        ? ""
                        : "none";

                return;
            }


            card.style.display = "";
        });
    }


    // =====================================================
    // SIGN OUT
    // =====================================================

    function signOut() {

        // Delete saved account
        localStorage.removeItem("careerlyUser");


        // Hide dashboard
        if (dashboard) {
            dashboard.hidden = true;
        }


        // Close profile menu
        const profileMenu =
            document.querySelector(".profile-menu");

        if (profileMenu) {
            profileMenu.classList.remove("visible");
        }


        // Remove top Sign Out button
        const signoutButton =
            document.querySelector("#top-signout");

        if (signoutButton) {
            signoutButton.remove();
        }


        // Reset guest buttons
        const guestActions =
            document.querySelector(".guest-actions");

        if (guestActions) {
            guestActions.style.display = "";
        }


        // Remove old signup screen
        const signupScreen =
            document.querySelector("#signup-screen");

        if (signupScreen) {
            signupScreen.remove();
        }


        // Show signup screen
        createSignupScreen();
    }


    // =====================================================
    // EXISTING AUTH MODAL
    // =====================================================

    function setupExistingAuth() {

        if (!authBackdrop) return;


        const openButtons =
            document.querySelectorAll("[data-open-auth]");

        const closeButton =
            document.querySelector("[data-close-auth]");

        const tabs =
            document.querySelectorAll("[data-auth-tab]");

        const forms =
            document.querySelectorAll("[data-auth-form]");


        // -----------------------------------------------
        // Open modal
        // -----------------------------------------------

        openButtons.forEach(button => {

            if (button.dataset.jsReady === "true") {
                return;
            }

            button.dataset.jsReady = "true";


            button.addEventListener("click", () => {

                const mode =
                    button.dataset.openAuth;


                authBackdrop.hidden = false;

                switchAuthTab(mode);
            });
        });


        // -----------------------------------------------
        // Close modal
        // -----------------------------------------------

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    authBackdrop.hidden = true;
                }
            );
        }


        // -----------------------------------------------
        // Click outside modal
        // -----------------------------------------------

        authBackdrop.addEventListener(
            "click",
            (event) => {

                if (event.target === authBackdrop) {

                    authBackdrop.hidden = true;
                }
            }
        );


        // -----------------------------------------------
        // Switch tabs
        // -----------------------------------------------

        tabs.forEach(tab => {

            tab.addEventListener("click", () => {

                switchAuthTab(
                    tab.dataset.authTab
                );
            });
        });


        // -----------------------------------------------
        // Existing forms
        // -----------------------------------------------

        forms.forEach(form => {

            if (form.dataset.jsReady === "true") {
                return;
            }

            form.dataset.jsReady = "true";


            form.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();

                    const mode =
                        form.dataset.authForm;


                    if (mode === "signin") {

                        handleModalSignIn(form);

                    } else {

                        handleModalSignup(form);
                    }
                }
            );
        });
    }


    // =====================================================
    // SWITCH AUTH TAB
    // =====================================================

    function switchAuthTab(mode) {

        const tabs =
            document.querySelectorAll("[data-auth-tab]");

        const forms =
            document.querySelectorAll("[data-auth-form]");

        const title =
            document.querySelector("#auth-title");


        tabs.forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.authTab === mode
            );
        });


        forms.forEach(form => {

            form.hidden =
                form.dataset.authForm !== mode;
        });


        if (title) {

            title.textContent =
                mode === "signup"
                    ? "Create your account."
                    : "Find work that fits you.";
        }
    }


    // =====================================================
    // MODAL SIGN IN
    // =====================================================

    function handleModalSignIn(form) {

        const email =
            form.querySelector(
                'input[type="email"]'
            ).value.trim();

        const password =
            form.querySelector(
                'input[type="password"]'
            ).value;


        if (!email || password.length < 6) {
            showAuthStatus(
                "Please enter a valid email and password."
            );
            return;
        }


        const existingUser =
            JSON.parse(
                localStorage.getItem("careerlyUser") || "null"
            );


        const user = existingUser || {
            name: email.split("@")[0],
            email: email
        };


        localStorage.setItem(
            "careerlyUser",
            JSON.stringify(user)
        );


        authBackdrop.hidden = true;

        showDashboard(user);
    }


    // =====================================================
    // MODAL SIGNUP
    // =====================================================

    function handleModalSignup(form) {

        const name =
            form.querySelector(
                'input[type="text"]'
            ).value.trim();

        const email =
            form.querySelector(
                'input[type="email"]'
            ).value.trim();

        const password =
            form.querySelector(
                'input[type="password"]'
            ).value;


        if (name.length < 2) {

            showAuthStatus(
                "Please enter your full name."
            );

            return;
        }


        if (!email ||
            !form.querySelector('input[type="email"]').checkValidity()) {

            showAuthStatus(
                "Please enter a valid email address."
            );

            return;
        }


        if (password.length < 6) {

            showAuthStatus(
                "Password must be at least 6 characters."
            );

            return;
        }


        const user = {
            name: name,
            email: email
        };


        localStorage.setItem(
            "careerlyUser",
            JSON.stringify(user)
        );


        authBackdrop.hidden = true;

        showDashboard(user);
    }


    // =====================================================
    // AUTH STATUS MESSAGE
    // =====================================================

    function showAuthStatus(message) {

        const status =
            document.querySelector(".auth-status");

        if (!status) return;

        status.textContent = message;
    }


    // =====================================================
    // START APPLICATION
    // =====================================================

    setupExistingAuth();


    if (!savedUser) {

        // -----------------------------------------------
        // NEW USER
        // -----------------------------------------------

        createSignupScreen();

    } else {

        // -----------------------------------------------
        // RETURNING USER
        // -----------------------------------------------

        try {

            const user =
                JSON.parse(savedUser);


            if (
                user &&
                user.name &&
                user.email
            ) {

                showDashboard(user);

            } else {

                localStorage.removeItem(
                    "careerlyUser"
                );

                createSignupScreen();
            }

        } catch {

            localStorage.removeItem(
                "careerlyUser"
            );

            createSignupScreen();
        }
    }

});