// script.js
let counter = 0;
const counterDisplay = document.getElementById('counter');
const plusButton = document.getElementById('plus-btn');
const minusButton = document.getElementById('minus-btn');

plusButton.addEventListener('click', () => {
    counter++ ;
    counterDisplay.textContent = counter;
});

minusButton.addEventListener('click', () => {
    counter--;
    counterDisplay.textContent = counter;
});
