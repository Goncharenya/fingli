const popupStartProject = document.querySelector('.popup'),
    btnStartProject = document.querySelector('.btn__start-project'),
    popupClose = document.querySelector('.popup__close');

btnStartProject.addEventListener("click", function () {
    popupStartProject.classList.add('popup-open');


});

popupClose.addEventListener('click', function () {
    popupStartProject.classList.remove('popup-open');
})


document.addEventListener("click", function (e) {
    // кликнули не на кнопку открытие меню
    if (e.target !== btnStartProject) {
        // открыто ли меню
        if (popupStartProject !== null
            && popupStartProject.classList.contains('popup-open')
        ) {
            // кликнули не на меню
            if (e.target.closest('popupStartProject') === null) {
                // значит его надо закрыть
                popupStartProject.classList.add('popup-open')
            }
        }
    }
});