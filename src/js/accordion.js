document.querySelectorAll('.accordion__title').forEach((tab) => {
    tab.addEventListener('click', function () {
        const parent = tab.parentNode;
        if (parent.classList.contains('_active')) {
            parent.classList.remove('_active');
        } else {
            document.querySelectorAll('accordion__item').forEach((child) =>
                child.classList.remove('_active'))
            parent.classList.add('_active')
        }
    })
})
