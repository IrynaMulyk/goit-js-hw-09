const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', startChangeColor);
btnStop.addEventListener('click', stopChangeColor);

let intervalId = null;
btnStop.disabled = true;
const body = document.querySelector('body');

function startChangeColor() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  changeButtons();
}

function stopChangeColor() {
  clearInterval(intervalId);
  changeButtons();
}
function changeButtons() {
  btnStart.toggleAttribute('disabled');
  btnStop.toggleAttribute('disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
