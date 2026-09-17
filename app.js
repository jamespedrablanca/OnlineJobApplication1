document.addEventListener("DOMContentLoaded", () => {

    const landingPage = document.querySelector(".landing-page");
    const dashboard = document.querySelector("#dashboard");
    const authBackdrop = document.querySelector("[data-auth-backdrop]");

    const savedUser = localStorage.getItem("careerlyUser");

    landingPage.hidden = true;
    dashboard.hidden = true;
    if (authBackdrop) authBackdrop.hidden = true;


    // =====================================================
    // CREATE FULL-SCREEN SIGNUP SCREEN
    // =====================================================

    function createSignupScreen() {

        const screen = document.createElement("div");

        screen.id = "signup-screen";

        screen.innerHTML = `
            <div class="signup-container">

                <div class="signup-logo">
                    <span>✦</span>
                    <strong>careerly</strong>
                </div>

                <div class="signup-content">

                    <p class="signup-eyebrow">WELCOME TO CAREERLY</p>

                    <h1>Create your account.</h1>

                    <p class="signup-description">
                        Start discovering meaningful opportunities and
                        take the next step in your career.
                    </p>

                    <form id="signup-screen-form">

                        <label>Full name</label>
                        <input
                            type="text"
                            id="screen-name"
                            placeholder="Jordan Davis"
                            required
                        >

                        <label>Email address</label>
                        <input
                            type="email"
                            id="screen-email"
                            placeholder="you@example.com"
                            required
                        >

                        <label>Password</label>
                        <input
                            type="password"
                            id="screen-password"
                            placeholder="At least 6 characters"
                            minlength="6"
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
                        <small>YOUR NEXT ROLE</small>
                        <strong>
                            Senior Product<br>
                            Designer
                        </strong>
                        <span>Lumen Studio · New York</span>
                    </div>

                    <span class="signup-star">✦</span>
                </div>

            </div>
        `;


        const style = document.createElement("style");

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

        const form = document.querySelector("#signup-screen-form");

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = document
                .querySelector("#screen-name")
                .value
                .trim();

            const email = document
                .querySelector("#screen-email")
                .value
                .trim();

            const password = document
                .querySelector("#screen-password")
                .value;

            const error = document.querySelector("#signup-error");


            if (!name || !email || password.length < 6) {
                error.textContent =
                    "Please fill in all fields correctly.";
                return;
            }


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

        dashboard.hidden = false;

        updateUser(user);

        updateLoggedInNavigation();

    }


    // =====================================================
    // UPDATE USER NAME / EMAIL / AVATAR
    // =====================================================

    function updateUser(user) {

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


        const initials = user.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0].toUpperCase())
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

        // Hide Sign in / Create account buttons
        const guestActions =
            document.querySelector(".guest-actions");

        if (guestActions) {
            guestActions.style.display = "none";
        }


        // Create a Sign Out button
        const topActions =
            document.querySelector(".top-actions");

        if (!topActions) return;


        let signoutButton =
            document.querySelector("#top-signout");


        if (!signoutButton) {

            signoutButton = document.createElement("button");

            signoutButton.id = "top-signout";
            signoutButton.textContent = "Sign out";

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


            signoutButton.addEventListener("click", signOut);
        }


        // Show member actions if they exist
        const memberActions =
            document.querySelector(".member-actions");

        if (memberActions) {
            memberActions.style.display = "flex";
        }
    }


    // =====================================================
    // SIGN OUT
    // =====================================================

    function signOut() {

        localStorage.removeItem("careerlyUser");

        dashboard.hidden = true;

        const signupScreen =
            document.querySelector("#signup-screen");

        if (signupScreen) {
            signupScreen.remove();
        }

        const signoutButton =
            document.querySelector("#top-signout");

        if (signoutButton) {
            signoutButton.remove();
        }

        createSignupScreen();
    }


    // =====================================================
    // CONNECT EXISTING SIGN OUT BUTTON
    // =====================================================

    const existingSignout =
        document.querySelector("[data-signout]");

    if (existingSignout) {

        existingSignout.addEventListener(
            "click",
            signOut
        );
    }


    // =====================================================
    // START APPLICATION
    // =====================================================

    if (!savedUser) {

        // New user
        createSignupScreen();

    } else {

        // Returning user
        try {

            const user = JSON.parse(savedUser);

            showDashboard(user);

        } catch {

            localStorage.removeItem("careerlyUser");

            createSignupScreen();
        }
    }

});