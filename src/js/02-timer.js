import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', startTimer);
startBtn.disabled = true;
let msLeft = null;
let intervalId = null;
let currentDate = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    msLeft = selectedDate - Date.now();
    console.log(msLeft);
    if (msLeft < 0) {
      alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

function startTimer() {
  intervalId = setInterval(() => {
    msLeft = selectedDate - Date.now();
    let convertedTime = convertMs(msLeft);
    if (msLeft <= 1000) {
      clearInterval(intervalId);
    }
    daysLeft.textContent = addLeadingZero(convertedTime.days);
    hoursLeft.textContent = addLeadingZero(convertedTime.hours);
    minutesLeft.textContent = addLeadingZero(convertedTime.minutes);
    secondsLeft.textContent = addLeadingZero(convertedTime.seconds);
    console.log(msLeft);
  }, 1000);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
