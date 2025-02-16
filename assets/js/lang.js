document.addEventListener("DOMContentLoaded", function () {
    const langSelector = document.querySelector(".btn-lang");
    const modalLang = document.querySelector(".modal-lang");
    const langButtons = modalLang.querySelectorAll("button");
    const currentLangDisplay = document.querySelector(".section-lang-active");

    // Charger la langue depuis les cookies ou mettre "fr" par défaut
    const currentLang = getCookie("lang") || "fr";
    setLanguage(currentLang);

    // Toggle du menu de sélection
    langSelector.addEventListener("click", () => {
        modalLang.style.display = modalLang.style.display === "block" ? "none" : "block";
    });

    // Appliquer la langue sélectionnée
    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("lang");
            setLanguage(selectedLang);
            setCookie("lang", selectedLang, 365);
            modalLang.style.display = "none";
        });
    });

    function setLanguage(lang) {
        fetch("./assets/js/traduction.json")
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll("[data-translate]").forEach(el => {
                    const key = el.getAttribute("data-translate");
                    if (data[lang] && data[lang][key]) {
                        el.textContent = data[lang][key];
                    }
                });

                // Mettre à jour l'affichage du bouton principal
                currentLangDisplay.textContent = data[lang]["language"];

                // Mettre en surbrillance le bouton de la langue sélectionnée
                langButtons.forEach(btn => btn.classList.remove("--lang-active"));
                document.querySelector(`[lang='${lang}']`).classList.add("--lang-active");
            })
            .catch(error => console.error("Erreur chargement traduction:", error));
    }

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
        console.log(`Cookie défini: ${document.cookie}`); // DEBUG
    }
    
    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const [key, value] = cookies[i].split("=");
            if (key === name) return value;
        }
        return null;
    }
});

