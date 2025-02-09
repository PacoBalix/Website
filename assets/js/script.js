const header = document.querySelector('header');
let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    console.log(currentScrollPos);


    if (currentScrollPos === 0) {
        header.classList.remove('scroll');
    } else if (prevScrollPos < currentScrollPos) {
        header.classList.add('--hidden', 'scroll');
    } else {
        header.classList.remove('--hidden');
    }

    prevScrollPos = currentScrollPos;
};



let modalLang = document.querySelector(".modal-lang");
let LangBtns = modalLang.querySelectorAll("button[lang]");
let btnChangeLang = document.querySelector(".btn-lang");
let sectionLangActive = document.querySelector(".section-lang-active");


LangBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        LangBtns.forEach((btn) => {
            btn.classList.remove("--lang-active");
        });
        btn.classList.add("--lang-active");
        sectionLangActive.textContent = btn.textContent;
        modalLang.classList.remove("--active");
    });
});

btnChangeLang.addEventListener('click', () => {
    modalLang.classList.toggle("--active");
});