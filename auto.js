<<<<<<< HEAD
// Oefenlogin: geen echte beveiliging.
const DEMO_USERNAME = "janyar";
const DEMO_PASSWORD = "auto123";

const loginPage = document.getElementById("loginPage");
const carPage = document.getElementById("carPage");
const loginForm = document.getElementById("loginForm");

const username = document.getElementById("username");
const password = document.getElementById("password");
const loginError = document.getElementById("loginError");
const togglePassword = document.getElementById("togglePassword");
const logoutButton = document.getElementById("logoutButton");

const search = document.getElementById("search");
const container = document.getElementById("carContainer");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");

// AUTO'S
=======
document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
>>>>>>> 9ca564f654721fd3c7363e01fd71fe0b8a137bbf

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

<<<<<<< HEAD
// INLOGGEN

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const correctUsername =
            username.value.trim() === DEMO_USERNAME;

        const correctPassword =
            password.value === DEMO_PASSWORD;

        if (correctUsername && correctPassword) {
            if (loginError) {
                loginError.textContent = "";
            }

            // Auto-overzicht op dezelfde pagina.
            if (loginPage && carPage && container) {
                loginForm.reset();
                resetPasswordVisibility();

                loginPage.hidden = true;
                carPage.hidden = false;

                document.title = "Auto Website | Auto's";

                const carTitle = document.getElementById("carTitle");

                if (carTitle) {
                    carTitle.focus();
                }
            } else {
                // Auto-overzicht in een apart bestand.
                window.location.href = "autos.html";
            }
        } else {
            if (loginError) {
                loginError.textContent =
                    "De gebruikersnaam of het wachtwoord is onjuist.";
            }

            password.value = "";
            password.focus();
=======
        if (name.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
>>>>>>> 9ca564f654721fd3c7363e01fd71fe0b8a137bbf
        }
    });
<<<<<<< HEAD
}

// WACHTWOORD TONEN OF VERBERGEN

function resetPasswordVisibility() {
    if (password) {
        password.type = "password";
=======

});

function openModal(title, info, img) {

    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalInfo").innerText = info;
    document.getElementById("modalImg").src = img;
    document.getElementById("modal").style.display = "block";

}

function closeModal() {

    document.getElementById("modal").style.display = "none";

}

window.onclick = function(event) {

    let modal = document.getElementById("modal");

    if (event.target === modal) {
        closeModal();
>>>>>>> 9ca564f654721fd3c7363e01fd71fe0b8a137bbf
    }

    if (togglePassword) {
        togglePassword.textContent = "Toon wachtwoord";
        togglePassword.setAttribute("aria-pressed", "false");
    }
}

if (togglePassword && password) {
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
}

// AUTOKAARTEN MAKEN
// Alleen uitvoeren als de container op deze pagina bestaat.

if (container) {
    container.replaceChildren();

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
}

// UITLOGGEN

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        closeModal();

        if (loginPage && carPage && loginForm) {
            carPage.hidden = true;
            loginPage.hidden = false;

            loginForm.reset();
            resetPasswordVisibility();

            if (loginError) {
                loginError.textContent = "";
            }

            if (search) {
                search.value = "";
                filterCars();
            }

            document.title = "Auto Website | Inloggen";

            if (username) {
                username.focus();
            }
        } else {
            window.location.href = "login.html";
        }
    });
}

// ZOEKFUNCTIE

function filterCars() {
    if (!search) {
        return;
    }

    const value = search.value.trim().toLowerCase();
    let visibleCars = 0;

    document.querySelectorAll(".card").forEach(function (card) {
        const name = (card.dataset.name || "").toLowerCase();
        const matches = name.includes(value);

        card.hidden = !matches;

        // Werkt ook met de oorspronkelijke CSS.
        card.style.display = matches ? "" : "none";

        if (matches) {
            visibleCars++;
        }
    });

    const noResults = document.getElementById("noResults");

    if (noResults) {
        noResults.hidden = visibleCars !== 0;
    }
}

if (search) {
    search.addEventListener("input", filterCars);
}

// POP-UP OPENEN
// Ondersteunt zowel een dialog als je oorspronkelijke modal-div.

function openModal(title, info, image) {
    if (!modal) {
        return;
    }

    const modalTitle = document.getElementById("modalTitle");
    const modalInfo = document.getElementById("modalInfo");
    const modalImg = document.getElementById("modalImg");

    if (modalTitle) {
        modalTitle.textContent = title;
    }

    if (modalInfo) {
        modalInfo.textContent = info;
    }

    if (modalImg) {
        modalImg.src = image;
        modalImg.alt = title;
    }

    if (modal.tagName === "DIALOG") {
        if (!modal.open) {
            modal.showModal();
        }
    } else {
        modal.style.display = "block";
    }
}

// POP-UP SLUITEN

function closeModal() {
    if (!modal) {
        return;
    }

    if (modal.tagName === "DIALOG") {
        modal.close();
    } else {
        modal.style.display = "none";
    }
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
}

// BUITEN DE POP-UP KLIKKEN

if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target !== modal) {
            return;
        }

        if (modal.tagName === "DIALOG") {
            const bounds = modal.getBoundingClientRect();

            const outside =
                event.clientX < bounds.left ||
                event.clientX > bounds.right ||
                event.clientY < bounds.top ||
                event.clientY > bounds.bottom;

            if (outside) {
                closeModal();
            }
        } else {
            closeModal();
        }
    });
}

// ESCAPE VOOR DE OORSPRONKELIJKE MODAL-DIV
// Een dialog ondersteunt Escape automatisch.

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        modal &&
        modal.tagName !== "DIALOG"
    ) {
        closeModal();
    }
});