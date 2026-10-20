// Accounts blijven beschikbaar totdat de pagina wordt vernieuwd.

const accounts = new Map([
    ["janyar", "auto123"]
]);

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

// PAGINA WISSELEN

function showPage(page) {
    loginPage.hidden = true;
    registerPage.hidden = true;
    carPage.hidden = true;

    page.hidden = false;
}

// REGISTRATIE OPENEN

document.getElementById("showRegister").addEventListener("click", function () {
    loginForm.reset();
    resetPasswordVisibility();

    loginError.textContent = "";
    loginSuccess.textContent = "";
    registerError.textContent = "";

    showPage(registerPage);

    document.title = "Auto Website | Registreren";
    document.getElementById("registerTitle").focus();
});

// TERUG NAAR INLOGGEN

document.getElementById("backToLogin").addEventListener("click", function () {
    registerForm.reset();
    registerError.textContent = "";

    showPage(loginPage);

    document.title = "Auto Website | Inloggen";
    username.focus();
});

// ACCOUNT MAKEN

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    registerError.textContent = "";

    const chosenUsername = newUsername.value.trim().toLowerCase();
    const chosenPassword = newPassword.value;

    if (!/^[a-z0-9_-]{3,30}$/.test(chosenUsername)) {
        registerError.textContent =
            "Gebruik 3 tot 30 letters, cijfers, streepjes of underscores.";

        newUsername.focus();
        return;
    }

    if (accounts.has(chosenUsername)) {
        registerError.textContent =
            "Deze gebruikersnaam bestaat al. Kies een andere.";

        newUsername.focus();
        return;
    }

    if (chosenPassword.length < 8) {
        registerError.textContent =
            "Je wachtwoord moet minimaal 8 tekens bevatten.";

        newPassword.focus();
        return;
    }

    if (chosenPassword !== confirmPassword.value) {
        registerError.textContent =
            "De wachtwoorden zijn niet hetzelfde.";

        confirmPassword.focus();
        return;
    }

    accounts.set(chosenUsername, chosenPassword);

    registerForm.reset();
    loginForm.reset();
    resetPasswordVisibility();

    username.value = chosenUsername;
    loginError.textContent = "";

    loginSuccess.textContent =
        "Je account is aangemaakt! Je kunt nu inloggen.";

    showPage(loginPage);

    document.title = "Auto Website | Inloggen";
    password.focus();
});

// INLOGGEN

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    loginError.textContent = "";
    loginSuccess.textContent = "";

    const enteredUsername = username.value.trim().toLowerCase();
    const enteredPassword = password.value;

    if (
        accounts.has(enteredUsername) &&
        accounts.get(enteredUsername) === enteredPassword
    ) {
        loginForm.reset();
        resetPasswordVisibility();

        showPage(carPage);

        const carTitle = document.getElementById("carTitle");

        carTitle.textContent = "Welkom, " + enteredUsername;
        document.title = "Auto Website | Auto's";

        carTitle.focus();
    } else {
        loginError.textContent =
            "De gebruikersnaam of het wachtwoord is onjuist.";

        password.value = "";
        password.focus();
    }
});

// WACHTWOORD TONEN OF VERBERGEN

function resetPasswordVisibility() {
    password.type = "password";
    togglePassword.textContent = "Toon wachtwoord";
    togglePassword.setAttribute("aria-pressed", "false");
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

// UITLOGGEN

document.getElementById("logoutButton").addEventListener("click", function () {
    modal.close();

    loginForm.reset();
    resetPasswordVisibility();

    loginError.textContent = "";
    loginSuccess.textContent = "";

    search.value = "";
    filterCars();

    showPage(loginPage);

    document.title = "Auto Website | Inloggen";
    username.focus();
});

// AUTO'S

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

// AUTOKAARTEN MAKEN

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
        openModal(car.name, car.info, car.image);
    });

    container.append(card);
});

// ZOEKFUNCTIE

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

// POP-UP OPENEN

function openModal(title, info, image) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalInfo").textContent = info;

    document.getElementById("modalImg").src = image;
    document.getElementById("modalImg").alt = title;

    modal.showModal();
}

// POP-UP SLUITEN

document.getElementById("closeModal").addEventListener("click", function () {
    modal.close();
});

// BUITEN DE POP-UP KLIKKEN

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