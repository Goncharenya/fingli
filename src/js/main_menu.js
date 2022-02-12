const body = document.querySelector('body'),
    headerMenu = document.querySelector('.header__menu'),
    lineBox = document.querySelector('.line-box'),
    navList = document.querySelector('.header__mobile-list');


lineBox.addEventListener("click", function (event) {
    headerMenu.classList.toggle("_active");

});

