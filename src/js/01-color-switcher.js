function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalID = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  e.target.setAttribute('disabled', 'true');
  intervalID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick(e) {
  startBtn.removeAttribute('disabled');
  clearInterval(intervalID);
}
