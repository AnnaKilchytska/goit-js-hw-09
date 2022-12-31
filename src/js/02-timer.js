import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicherEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', 'true');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = 0;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    const currentDate = date.getTime();
    const chosenDate = selectedDates[0].getTime();
    console.log(chosenDate - currentDate);
    if (chosenDate < currentDate) {
      alert('Please, choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      //   console.log(chosenDate);
      selectedDate = chosenDate;

      return selectedDate;
    }
  },
};

const fp = flatpickr(dateTimePicherEl, options);

dateTimePicherEl.addEventListener('click', fp);
startBtn.addEventListener('click', startTimer);

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

function startTimer() {
  intervalID = setInterval(() => {
    const date = new Date();
    const currentDate = date.getTime();
    console.log(currentDate);

    const remainingTime = convertMs(selectedDate - currentDate);

    console.log(remainingTime);

    updateInterface(remainingTime);
    stopTimer(intervalID);
  }, 1000);
}

function updateInterface(remainingTime) {
  addLeadingZero(remainingTime);

  const { days, hours, minutes, seconds } = remainingTime;

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function stopTimer() {
  if (
    daysEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    secondsEl.textContent === '00'
  ) {
    console.log('End of timer');
    clearInterval(intervalID);
    startBtn.setAttribute('disabled', 'true');
  }
}

function addLeadingZero(value) {
  const keysArr = Object.keys(value);

  keysArr.forEach(item => {
    if (value[item] < 10) {
      value[item] = value[item].toString().padStart(2, '0');
    }
  });

  console.log(value);
}
