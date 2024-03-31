import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector("[data-start]");

//БЛОКУЄМО КНОПКУ СТАРТ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
disableStartButton(true);

// НАЛАШТУВАННЯ FLATPICKR
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];

    if (userSelectedDate < Date.now()) {
      iziToast.error({
        title: 'Error!',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        position: 'topCenter',
        backgroundColor: 'red',
      }) 
      disableStartButton();
    } else {
      disableStartButton(false);
  }
}
};

// ІНІЦІАЛІЗАЦІЯ КАЛЕНДАРЯ
flatpickr(dateTimePicker, options);


// ПРОСЛУХОВУВАЧ ПОДІЙ КНОПКИ СТАРТ
startBtn.addEventListener("click", function() {
  const selectedDate = new Date(dateTimePicker.value);
  const currentDate = new Date();
  let timeDifference = selectedDate - currentDate;


  function updateInterval() {
    const remainingTime = convertMs(timeDifference);
    document.querySelector('[data-days]').textContent = addLeadingZero(remainingTime.days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(remainingTime.hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(remainingTime.minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(remainingTime.seconds);


    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      document.querySelectorAll(".value").forEach(elem => elem.textContent = "00");
      iziToast.success({
        title: 'Success!',
        message: 'Countdown is over!',
        messageColor: 'white',
        position: 'topCenter',
        backgroundColor: 'green',
      }) 
      disableStartButton(false);
    } else {
      timeDifference -= 1000;
    }
  }
    updateInterval();
    disableStartButton();

const timerInterval = setInterval(updateInterval, 1000); // Таймер для оновлення таймера кожну секунду
});


// ФУНКЦІЯ ДЛЯ СКРИВАННЯ КНОПКИ СТАРТ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
function disableStartButton(flag = true) {
  startBtn.disabled = flag;
}


// ФУНКЦІЯ ДЛЯ ПІДРАХУНКУ ЗНАЧЕНЬ
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


// ФУНКЦІЯ ЯКА ДОБАВЛЯЄ 0, ЯКЩО В ЧИСЛІ МЕНШЕ 2 СИМВОЛІВ
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
