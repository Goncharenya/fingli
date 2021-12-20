const body = document.querySelector('body'),
    headerMenu = document.querySelector('.header__menu'),
    lineBox = document.querySelector('.line-box'),
    navList = document.querySelector('.header__mobile-list');

// body.classList.remove("no-js");
// navList.classList.remove("_active");
// lineBox.classList.remove("menu__hidden");

lineBox.addEventListener("click", function () {

    headerMenu.classList.toggle("_active");
   // lineBox.classList.toggle("menu__close");
});