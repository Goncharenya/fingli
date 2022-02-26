const popupStartProject = document.querySelector('.popup'),
    btnStartProject = document.querySelector('.btn__start-project'),
    popupClose = document.querySelector('.popup__close'),
    btnStart = document.querySelector('.btn-start');


btnStartProject.addEventListener("click", function () {
    popupStartProject.classList.add('popup-open');

});

popupClose.addEventListener('click', function () {
    popupStartProject.classList.remove('popup-open');
})

btnStart.addEventListener('click', function () {
    popupStartProject.classList.add('popup-open');

})
popupStartProject.addEventListener('click', modalHide)

function modalHide(event) {
if(event.target === popupStartProject) {

}

}