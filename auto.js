// ========================================
// AUTO WEBSITE - ACCOUNT OPSLAAN
// ========================================

// Opslagnamen
const ACCOUNTS_KEY = "autoWebsiteAccounts";
const SESSION_KEY = "autoWebsiteSession";

// Elementen ophalen
const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const carPage = document.getElementById("carPage");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const username = document.getElementById("username");
const password = document.getElementById("password");

const newUsername = document.getElementById("newUsername");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const loginError = document.getElementById("loginError");
const loginSuccess = document.getElementById("loginSuccess");
const registerError = document.getElementById("registerError");

const togglePassword = document.getElementById("togglePassword");
const search = document.getElementById("search");
const container = document.getElementById("carContainer");
const modal = document.getElementById("modal");


// ========================================
// ACCOUNTS OPSLAAN EN OPHALEN
// ========================================

function getAccounts() {
    try {
        return JSON.parse(
            localStorage.getItem(ACCOUNTS_KEY)
        ) || {};
    } catch (error) {
        console.error("Accounts ophalen mislukt:", error);
        return {};
    }
}

function saveAccounts(accounts) {
    try {
        localStorage.setItem(
            ACCOUNTS_KEY,
            JSON.stringify(accounts)
        );

        return true;

    } catch (error) {
        console.error("Accounts opslaan mislukt:", error);
        return false;
    }
}


// ========================================
// WACHTWOORD HASHEN
// ========================================

async function hashPassword(password, salt) {

    if (!window.crypto || !window.crypto.subtle) {
        throw new Error(
            "Gebruik HTTPS of localhost om veilig in te loggen."
        );
    }

    const encoder = new TextEncoder();

    const data = encoder.encode(
        salt + password
    );

    const hash = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


// ========================================
// PAGINA WISSELEN
// ========================================

function showPage(page) {

    loginPage.hidden = true;
    registerPage.hidden = true;
    carPage.hidden = true;

    page.hidden = false;
}


// ========================================
// INGELOGDE GEBRUIKER TONEN
// ========================================

function showCars(loggedInUsername) {

    showPage(carPage);

    const carTitle = document.getElementById("carTitle");

    carTitle.textContent = "Welkom, " + loggedInUsername;

    document.title = "Auto Website | Auto's";

    carTitle.focus();
}


// ========================================
// CONTROLEREN OF GEBRUIKER INGELOGD IS
// ========================================

function checkLogin() {

    const savedSession = localStorage.getItem(SESSION_KEY);

    if (savedSession) {

        const accounts = getAccounts();

        if (accounts[savedSession]) {

            showCars(savedSession);

            return;
        }

        localStorage.removeItem(SESSION_KEY);
    }

    showPage(loginPage);

    document.title = "Auto Website | Inloggen";
}


// ========================================
// REGISTRATIE OPENEN
// ========================================

document.getElementById("showRegister")
    .addEventListener("click", function () {

        loginForm.reset();

        resetPasswordVisibility();

        loginError.textContent = "";
        loginSuccess.textContent = "";
        registerError.textContent = "";

        showPage(registerPage);

        document.title = "Auto Website | Registreren";

        document.getElementById("registerTitle").focus();
    });


// ========================================
// TERUG NAAR INLOGGEN
// ========================================

document.getElementById("backToLogin")
    .addEventListener("click", function () {

        registerForm.reset();

        registerError.textContent = "";

        showPage(loginPage);

        document.title = "Auto Website | Inloggen";

        username.focus();
    });


// ========================================
// ACCOUNT AANMAKEN
// ========================================

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    registerError.textContent = "";

    const chosenUsername = newUsername.value
        .trim()
        .toLowerCase();

    const chosenPassword = newPassword.value;

    const repeatedPassword = confirmPassword.value;


    // Gebruikersnaam controleren

    if (!/^[a-z0-9_-]{3,30}$/.test(chosenUsername)) {

        registerError.textContent =
            "Gebruik 3 tot 30 letters, cijfers, streepjes of underscores.";

        return;
    }


    // Accounts ophalen

    const accounts = getAccounts();


    // Controleren of gebruikersnaam bestaat

    if (accounts[chosenUsername]) {

        registerError.textContent =
            "Deze gebruikersnaam bestaat al. Kies een andere.";

        return;
    }


    // Wachtwoord controleren

    if (chosenPassword.length < 8) {

        registerError.textContent =
            "Je wachtwoord moet minimaal 8 tekens bevatten.";

        return;
    }


    // Wachtwoorden vergelijken

    if (chosenPassword !== repeatedPassword) {

        registerError.textContent =
            "De wachtwoorden zijn niet hetzelfde.";

        return;
    }


    try {

        // Unieke salt maken

        const saltArray = crypto.getRandomValues(
            new Uint8Array(16)
        );

        const salt = Array.from(saltArray)
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");


        // Wachtwoord hashen

        const passwordHash = await hashPassword(
            chosenPassword,
            salt
        );


        // Account opslaan

        accounts[chosenUsername] = {
            salt: salt,
            passwordHash: passwordHash
        };


        // Opslaan in localStorage

        const saved = saveAccounts(accounts);

        if (!saved) {

            registerError.textContent =
                "Account opslaan is mislukt. Controleer je browserinstellingen.";

            return;
        }


        // Formulieren leegmaken

        registerForm.reset();

        loginForm.reset();

        resetPasswordVisibility();


        // Gebruikersnaam invullen

        username.value = chosenUsername;

        loginError.textContent = "";


        // Succesmelding

        loginSuccess.textContent =
            "Je account is aangemaakt! Je kunt nu inloggen.";


        // Naar inlogpagina

        showPage(loginPage);

        document.title = "Auto Website | Inloggen";

        password.focus();

    } catch (error) {

        console.error(error);

        registerError.textContent =
            error.message || "Er is iets misgegaan bij het registreren.";
    }

});


// ========================================
// INLOGGEN
// ========================================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    loginError.textContent = "";

    loginSuccess.textContent = "";

    const enteredUsername = username.value
        .trim()
        .toLowerCase();

    const enteredPassword = password.value;


    // Accounts ophalen

    const accounts = getAccounts();

    const account = accounts[enteredUsername];


    // Controleren of account bestaat

    if (!account) {

        loginError.textContent =
            "De gebruikersnaam of het wachtwoord is onjuist.";

        password.value = "";

        password.focus();

        return;
    }


    try {

        // Ingevoerde wachtwoord hashen

        const enteredHash = await hashPassword(
            enteredPassword,
            account.salt
        );


        // Wachtwoord vergelijken

        if (enteredHash === account.passwordHash) {

            // Sessie opslaan

            localStorage.setItem(
                SESSION_KEY,
                enteredUsername
            );


            // Formulier leegmaken

            loginForm.reset();

            resetPasswordVisibility();


            // Auto-overzicht openen

            showCars(enteredUsername);

        } else {

            loginError.textContent =
                "De gebruikersnaam of het wachtwoord is onjuist.";

            password.value = "";

            password.focus();
        }

    } catch (error) {

        console.error(error);

        loginError.textContent =
            error.message || "Inloggen is mislukt.";
    }

});


// ========================================
// WACHTWOORD TONEN OF VERBERGEN
// ========================================

function resetPasswordVisibility() {

    password.type = "password";

    togglePassword.textContent = "Toon wachtwoord";

    togglePassword.setAttribute(
        "aria-pressed",
        "false"
    );
}


togglePassword.addEventListener("click", function () {

    const showPassword = password.type === "password";

    password.type = showPassword ? "text" : "password";

    togglePassword.textContent = showPassword
        ? "Verberg wachtwoord"
        : "Toon wachtwoord";

    togglePassword.setAttribute(
        "aria-pressed",
        String(showPassword)
    );

});


// ========================================
// UITLOGGEN
// ========================================

document.getElementById("logoutButton")
    .addEventListener("click", function () {

        // Sessie verwijderen

        localStorage.removeItem(SESSION_KEY);

        // Pop-up sluiten

        if (modal.open) {
            modal.close();
        }

        // Formulieren leegmaken

        loginForm.reset();

        resetPasswordVisibility();

        loginError.textContent = "";

        loginSuccess.textContent = "";

        // Zoekfunctie resetten

        search.value = "";

        filterCars();

        // Terug naar inloggen

        showPage(loginPage);

        document.title = "Auto Website | Inloggen";

        username.focus();

    });


// ========================================
// AUTO'S
// ========================================

const cars = [

    {
        name: "BMW M4 Competition",
        summary: "450 PK • 2020",
        info: "Prijs: €69.900 | 2020 | 50.825 km | 450 PK",
        image: "bmw.png"
    },

    {
        name: "Audi RS6",
        summary: "600 PK • 2021",
        info: "Prijs: €89.000 | 2021 | 30.000 km | 600 PK",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"
    },

    {
        name: "Mercedes AMG C63",
        summary: "510 PK • 2019",
        info: "Prijs: €75.000 | 2019 | 60.000 km | 510 PK",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8"
    },

    {
        name: "Porsche 911",
        summary: "450 PK • 2022",
        info: "Prijs: €120.000 | 2022 | 10.000 km | 450 PK",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
    },

    {
        name: "Volkswagen Golf GTI TCR",
        summary: "290 PK • 2.0 TSI",
        info: "Prijs: €29.089 | 2.0 TSI | 290 PK | GTI TCR",
        image: "golf.png"
    },

    {
        name: "Toyota Supra",
        summary: "650 PK • 3.0i Twin Turbo",
        info: "Prijs: €119.995 | 3.0i Twin Turbo | Top Secret | 650 PK",
        image: "supra.png"
    },

    {
        name: "Tesla Model 3 Performance",
        summary: "AWD • 75 kWh • SOH 89%",
        info: "Prijs: €28.995 | Performance AWD | 75 kWh | SOH 89%",
        image: "tesla.png"
    },

    {
        name: "Ferrari 488",
        summary: "670 PK • 2018",
        info: "Prijs: €250.000 | 3.9 V8 | 670 PK | 2018",
        image: "ferrari 488.png"
    },

    {
        name: "Porsche Cayenne",
        summary: "450 PK • 2022",
        info: "Prijs: €120.000 | 3.0 V6 | 450 PK | 2022",
        image: "porsche cayan.png"
    }

];


// ========================================
// AUTOKAARTEN MAKEN
// ========================================

cars.forEach(function (car) {

    const card = document.createElement("button");

    card.type = "button";

    card.className = "card";

    card.dataset.name = car.name.toLowerCase();


    const image = document.createElement("img");

    image.src = car.image;

    image.alt = car.name;

    image.loading = "lazy";


    const title = document.createElement("h3");

    title.textContent = car.name;


    const summary = document.createElement("p");

    summary.textContent = car.summary;


    card.append(image, title, summary);


    card.addEventListener("click", function () {

        openModal(
            car.name,
            car.info,
            car.image
        );

    });


    container.append(card);

});


// ========================================
// ZOEKFUNCTIE
// ========================================

function filterCars() {

    const value = search.value.trim().toLowerCase();

    let visibleCars = 0;


    document.querySelectorAll(".card").forEach(function (card) {

        const matches = card.dataset.name.includes(value);

        card.hidden = !matches;

        if (matches) {
            visibleCars++;
        }

    });


    document.getElementById("noResults").hidden =
        visibleCars !== 0;

}


search.addEventListener("input", filterCars);


// ========================================
// POP-UP OPENEN
// ========================================

function openModal(title, info, image) {

    document.getElementById("modalTitle").textContent = title;

    document.getElementById("modalInfo").textContent = info;

    document.getElementById("modalImg").src = image;

    document.getElementById("modalImg").alt = title;

    modal.showModal();

}


// ========================================
// POP-UP SLUITEN
// ========================================

document.getElementById("closeModal")
    .addEventListener("click", function () {

        modal.close();

    });


// Buiten de pop-up klikken om te sluiten

modal.addEventListener("click", function (event) {

    if (event.target !== modal) {
        return;
    }

    const bounds = modal.getBoundingClientRect();

    const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

    if (outside) {
        modal.close();
    }

});


// ========================================
// WEBSITE STARTEN
// ========================================

// Controleren of er al een actieve sessie bestaat.

checkLogin();