// Modal

const btnModals = document.querySelectorAll('.modal__button');
const modal = document.querySelector('.modal');
const body = document.querySelector('.body');
const btnCancel = document.querySelector('.modal__cancel');

// каждая кнопка
btnModals.forEach(button => {
    button.addEventListener('click', () => {
        body.classList.toggle('body--opened-modal');
    });
});


btnCancel.addEventListener('click', () => {
    body.classList.remove('body--opened-modal');
});


modal.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains('modal')) {
        body.classList.remove('body--opened-modal');
    }
});



//Calculator

document.addEventListener('DOMContentLoaded', function () {
    const selectOne = document.querySelector('.calc__self select');
    const selectTwo = document.getElementById('select-two');
    const squareInput = document.getElementById('calc-square');
    const rangeInput = document.getElementById('input-range');
    const totalPriceElement = document.getElementById('total-price');

    // Опции
    const rates = {
        var1: {
            var4: 5,
            var5: 10,
            var6: 15
        },
        var2: {
            var4: 4,
            var5: 8,
            var6: 12
        },
        var3: {
            var4: 7,
            var5: 14,
            var6: 21
        }
    };

    function calculateTotal() {
        const selectedArea = selectOne.value;
        const selectedRate = selectTwo.value;
        const square = Number(squareInput.value);

        if (selectedArea && selectedRate && rates[selectedArea] && rates[selectedArea][selectedRate]) {
            const pricePerSquareMeter = rates[selectedArea][selectedRate];
            const totalPrice = square * pricePerSquareMeter;
            totalPriceElement.textContent = totalPrice.toFixed(2);
        }
    }

    // Вариант чтобы слайдер и окно отбражались вместе
    selectOne.addEventListener('change', calculateTotal);
    selectTwo.addEventListener('change', calculateTotal);
    squareInput.addEventListener('input', function () {
        rangeInput.value = squareInput.value;
        calculateTotal();
    });
    rangeInput.addEventListener('input', function () {
        squareInput.value = rangeInput.value;
        calculateTotal();
    });
    // Загрузка стрраницы
    calculateTotal();
});

// Слайдер

document.addEventListener('DOMContentLoaded', function () {
    const rangeInput = document.getElementById('input-range');

    function updateSlider() {
        const value = rangeInput.value;
        const min = rangeInput.min ? rangeInput.min : 10;
        const max = rangeInput.max ? rangeInput.max : 300;

        const percentage = ((value - min) / (max - min)) * 100;
        rangeInput.style.setProperty('--fill-percentage', `${percentage}%`);
    }

    rangeInput.addEventListener('input', updateSlider);
    updateSlider();
});

// Cлайдер - ползунок.. спасите
document.addEventListener('DOMContentLoaded', function () {
    const rangeInput = document.getElementById('input-range');
    const sliderValue = document.getElementById('slider-value');

    // minmax values из опций
    function updateSlider() {
        const value = rangeInput.value;
        const min = rangeInput.min ? parseFloat(rangeInput.min) : 10;
        const max = rangeInput.max ? parseFloat(rangeInput.max) : 300;

        const percentage = ((value - min) / (max - min)) * 100;
        rangeInput.style.setProperty('--fill-percentage', `${percentage}%`);

        sliderValue.textContent = value;

        sliderValue.style.left = `calc(${percentage}% + (${8 - percentage * 0.15}px))`;
    }

    rangeInput.addEventListener('input', updateSlider);
    updateSlider();
});

// Телефон 

const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        // !!!ТОКЕН СЮДА!!!
        fetch('https://ipinfo.io?token=4d7c921e1c197f')
            .then(response => response.json())
            .then(data => callback(data.country.toLowerCase()))
            .catch(() => callback("us"));
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js"
});



// Слайдер с видео


const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },


    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

swiper.on('slideChange', function () {
    const videos = document.querySelectorAll('.swiper-slide video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
});

// Кнопка pause/play

document.addEventListener('DOMContentLoaded', function () {

    const playPauseButtons = document.querySelectorAll('.play-pause-btn');

    playPauseButtons.forEach(button => {
        const video = button.previousElementSibling;

        updateButtonVisibility(button, video);

        button.addEventListener('click', function () {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updateButtonVisibility(button, video);
        });


        video.addEventListener('play', function () {
            updateButtonVisibility(button, video);
        });

        video.addEventListener('pause', function () {
            updateButtonVisibility(button, video);
        });
    });

    function updateButtonVisibility(button, video) {
        if (video.paused) {
            button.classList.remove('hidden');
        } else {
            button.classList.add('hidden');
        }
    }
});

// Бургер 

document.addEventListener('DOMContentLoaded', function () {
    const burgerButton = document.getElementById('burger-button');
    const burgerMenuContent = document.getElementById('burger-menu-content');
    const burgerMenu = burgerMenuContent.parentElement;

    // Тоггл
    burgerButton.addEventListener('click', function (event) {
        event.stopPropagation();
        burgerButton.classList.toggle('active');
        burgerMenu.classList.toggle('open');
    });

    // Закрытие при нжаатии на пустое пространство
    document.addEventListener('click', function (event) {
        if (!burgerMenu.contains(event.target)) {
            burgerButton.classList.remove('active');
            burgerMenu.classList.remove('open');
        }
    });
});

document.querySelectorAll('.accordion-link').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const accordionItem = link.parentElement;
        const answers = document.querySelectorAll('.accordion-item .answer');

        if (accordionItem.classList.contains('open')) {
            accordionItem.classList.remove('open');
        } else {
            answers.forEach(answer => {
                const item = answer.closest('.accordion-item');
                if (item !== accordionItem) {
                    item.classList.remove('open');
                }
            });

            accordionItem.classList.add('open');
        }
    });
});

