const body = document.querySelector('body'),
    headerMenu = document.querySelector('.header__menu'),
    lineBox = document.querySelector('.line-box'),
    navList = document.querySelector('.header__mobile-list');


lineBox.addEventListener("click", function () {
    headerMenu.classList.toggle("_active");

});


document.addEventListener("click", function (e) {
    // кликнули не на кнопку открытие меню
    if (e.target !== lineBox) {
        // открыто ли меню
        if (headerMenu !== null
            && headerMenu.classList.contains('_active')
        ) {
            // кликнули не на меню
            if (e.target.closest('nav.header__menu') === null) {
                // значит его надо закрыть
                headerMenu.classList.remove('_active')
            }
        }
    }
});