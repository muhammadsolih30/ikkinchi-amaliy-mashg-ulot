AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
});

const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        menuItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

document.querySelector('.reservation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Rezervatsiyangiz qabul qilindi! Tez orada siz bilan bog‘lanamiz.');
});