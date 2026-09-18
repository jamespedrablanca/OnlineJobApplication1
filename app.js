document.addEventListener("DOMContentLoaded", () => {
    const landingPage = document.querySelector(".landing-page");
    const dashboard = document.querySelector("#dashboard");
    const authBackdrop = document.querySelector("[data-auth-backdrop]");

    // Hide everything at startup
    if (landingPage) landingPage.hidden = true;
    if (dashboard) dashboard.hidden = true;
    if (authBackdrop) authBackdrop.hidden = true;

    // ==========================================
    // USER STORAGE
    // ==========================================

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

    // ==========================================
    // SIGNUP SCREEN
    // ==========================================

    function createSignupScreen() {
        removeSignupScreen();
        removeLoginScreen();

        const signupScreen = document.createElement("div");
        signupScreen.id = "signup-screen";

        signupScreen.innerHTML = `
            <div class="signup-container">

                <div class="signup-left">
                    <div class="signup-brand">Careerly</div>

                    <div class="signup-content">
                        <span class="signup-label">GET STARTED</span>

                        <h1>Create your<br>Careerly account.</h1>

                        <p>
                            Find opportunities that fit your skills,
                            goals, and the way you want to work.
                        </p>

                        <form id="signup-screen-form">

                            <label for="signup-name">Full name</label>
                            <input
                                type="text"
                                id="signup-name"
                                name="signupName"
                                placeholder="Enter your full name"
                                autocomplete="name"
                                required
                            >

                            <label for="signup-email">Email address</label>
                            <input
                                type="email"
                                id="signup-email"
                                name="signupEmail"
                                placeholder="you@example.com"
                                autocomplete="email"
                                required
                            >

                            <label for="signup-password">Password</label>
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

                            <button type="submit" class="signup-submit">
                                Create account
                            </button>

                        </form>

                        <p class="signup-login-text">
                            Already have an account?
                            <button type="button" id="go-to-login">
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

        const form = document.querySelector("#signup-screen-form");

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

    // ==========================================
    // LOGIN SCREEN
    // ==========================================

    function createLoginScreen() {
        removeSignupScreen();
        removeLoginScreen();

        const loginScreen = document.createElement("div");
        loginScreen.id = "login-screen";

        loginScreen.innerHTML = `
            <div class="login-container">

                <div class="login-left">

                    <div class="login-brand">Careerly</div>

                    <div class="login-content">

                        <span class="login-label">
                            WELCOME BACK
                        </span>

                        <h1>Welcome<br>back.</h1>

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

    // ==========================================
    // HANDLE SIGNUP
    // ==========================================

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

        // Clear previous error
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

        // Save the registered account
        const account = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(
            "careerlyAccount",
            JSON.stringify(account)
        );

        // Do NOT log in automatically.
        // Send the user to the login page.
        createLoginScreen();

        // Pre-fill the registered email
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

    // ==========================================
    // HANDLE LOGIN
    // ==========================================

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

        // Successful login
        const user = {
            name: account.name,
            email: account.email
        };

        localStorage.setItem(
            "careerlyUser",
            JSON.stringify(user)
        );

        showDashboard(user);
    }

    // ==========================================
    // SHOW DASHBOARD
    // ==========================================

    function showDashboard(user) {
        removeSignupScreen();
        removeLoginScreen();

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

    // ==========================================
    // UPDATE USER INFORMATION
    // ==========================================

    function updateUser(user) {
        if (!user) return;

        document
            .querySelectorAll("[data-user-name]")
            .forEach(element => {
                element.textContent = user.name;
            });

        document
            .querySelectorAll("[data-user-email]")
            .forEach(element => {
                element.textContent = user.email;
            });

        const profileName =
            document.querySelector(".profile-card strong");

        if (profileName) {
            profileName.textContent = user.name;
        }

        const initials = getInitials(user.name);

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

    // ==========================================
    // LOGGED-IN NAVIGATION
    // ==========================================

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

    // ==========================================
    // DASHBOARD FUNCTIONS
    // ==========================================

    function setupDashboardFunctions() {

        // SAVE JOBS
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

        // APPLY JOBS
        document
            .querySelectorAll(".apply-button")
            .forEach(button => {

                button.onclick = () => {

                    if (button.disabled) return;

                    button.textContent = "Applied ✓";
                    button.disabled = true;
                    button.style.cursor = "default";
                    button.style.opacity = "0.8";
                };
            });

        // PROFILE MENU
        const profileButton =
            document.querySelector("[data-profile-menu]");

        const profileMenu =
            document.querySelector(".profile-menu");

        if (profileButton && profileMenu) {

            profileButton.onclick = event => {

                event.stopPropagation();

                profileMenu.classList.toggle(
                    "visible"
                );
            };

            document.addEventListener(
                "click",
                event => {

                    if (
                        !profileMenu.contains(event.target) &&
                        !profileButton.contains(event.target)
                    ) {
                        profileMenu.classList.remove(
                            "visible"
                        );
                    }
                }
            );
        }

        // SEARCH
        const searchButton =
            document.querySelector(".search-button");

        const searchInput =
            document.querySelector(
                ".search-panel input"
            );

        if (searchButton && searchInput) {

            searchButton.onclick = () => {
                searchJobs(searchInput.value);
            };

            searchInput.addEventListener(
                "keydown",
                event => {

                    if (event.key === "Enter") {
                        searchJobs(searchInput.value);
                    }
                }
            );
        }

        // FILTERS
        document
            .querySelectorAll(".filter")
            .forEach(filter => {

                filter.onclick = () => {

                    document
                        .querySelectorAll(".filter")
                        .forEach(item => {
                            item.classList.remove("active");
                        });

                    filter.classList.add("active");

                    const filterText =
                        filter.textContent
                            .trim()
                            .toLowerCase();

                    filterJobs(filterText);
                };
            });

        // EXISTING SIGNOUT BUTTON
        document
            .querySelectorAll("[data-signout]")
            .forEach(button => {
                button.onclick = signOut;
            });
    }

    // ==========================================
    // SEARCH JOBS
    // ==========================================

    function searchJobs(searchTerm) {

        const term =
            searchTerm.trim().toLowerCase();

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

    // ==========================================
    // FILTER JOBS
    // ==========================================

    function filterJobs(filterName) {

        const cards =
            document.querySelectorAll(".job-card");

        cards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            let show = true;

            if (filterName === "remote") {
                show = text.includes("remote");
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

            card.style.display =
                show ? "" : "none";
        });
    }

    // ==========================================
    // LOGOUT
    // ==========================================

    function signOut() {

        localStorage.removeItem("careerlyUser");

        if (dashboard) {
            dashboard.hidden = true;
        }

        const profileMenu =
            document.querySelector(".profile-menu");

        if (profileMenu) {
            profileMenu.classList.remove("visible");
        }

        const signoutButton =
            document.querySelector("#top-signout");

        if (signoutButton) {
            signoutButton.remove();
        }

        const guestActions =
            document.querySelector(".guest-actions");

        if (guestActions) {
            guestActions.style.display = "";
        }

        const memberActions =
            document.querySelector(".member-actions");

        if (memberActions) {
            memberActions.style.display = "";
        }

        // Keep the registered account.
        // Only remove the current login session.
        createLoginScreen();
    }

    // ==========================================
    // REMOVE SIGNUP SCREEN
    // ==========================================

    function removeSignupScreen() {

        const screen =
            document.querySelector("#signup-screen");

        if (screen) {
            screen.remove();
        }

        const style =
            document.querySelector("#signup-screen-style");

        if (style) {
            style.remove();
        }
    }

    // ==========================================
    // REMOVE LOGIN SCREEN
    // ==========================================

    function removeLoginScreen() {

        const screen =
            document.querySelector("#login-screen");

        if (screen) {
            screen.remove();
        }

        const style =
            document.querySelector("#login-screen-style");

        if (style) {
            style.remove();
        }
    }

    // ==========================================
    // SIGNUP STYLES
    // ==========================================

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

        style.id = "signup-screen-style";

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

    // ==========================================
    // LOGIN STYLES
    // ==========================================

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

        style.id = "login-screen-style";

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

    // ==========================================
    // EXISTING HTML AUTH MODAL
    // ==========================================
    // The old modal is kept available for the original
    // HTML buttons, but its forms are NOT connected to
    // the new full-screen signup/login system.

    function setupExistingAuth() {

        const openAuthButtons =
            document.querySelectorAll(
                "[data-open-auth]"
            );

        openAuthButtons.forEach(button => {

            button.addEventListener("click", () => {

                const mode =
                    button.getAttribute(
                        "data-open-auth"
                    );

                if (authBackdrop) {
                    authBackdrop.hidden = false;
                }

                switchAuthTab(mode);
            });
        });

        const closeButton =
            document.querySelector(
                "[data-close-auth]"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {
                    authBackdrop.hidden = true;
                }
            );
        }

        if (authBackdrop) {

            authBackdrop.addEventListener(
                "click",
                event => {

                    if (
                        event.target === authBackdrop
                    ) {
                        authBackdrop.hidden = true;
                    }
                }
            );
        }

        document
            .querySelectorAll("[data-auth-tab]")
            .forEach(tab => {

                tab.addEventListener("click", () => {

                    const mode =
                        tab.getAttribute(
                            "data-auth-tab"
                        );

                    switchAuthTab(mode);
                });
            });

        // IMPORTANT:
        // Do NOT attach the old modal's forms
        // to handleSignup or handleLogin.
    }

    // ==========================================
    // AUTH TAB SWITCHING
    // ==========================================

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

        const signInForm =
            document.querySelector(
                "[data-signin-form]"
            );

        const signUpForm =
            document.querySelector(
                "[data-signup-form]"
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
                "[data-auth-title]"
            );

        if (title) {

            title.textContent =
                mode === "signin"
                    ? "Welcome back"
                    : "Create your account";
        }
    }

    // ==========================================
    // START APPLICATION
    // ==========================================

    setupExistingAuth();

    const loggedInUser = getUser();

    if (loggedInUser) {

        showDashboard(loggedInUser);

    } else {

        createSignupScreen();
    }
});