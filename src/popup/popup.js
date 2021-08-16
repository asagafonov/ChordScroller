import './popup.css';

const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const speed = document.querySelector('#frq-meter');
const offset = document.querySelector('#offset-meter');
const speedValueBox = document.querySelector('.speed-value');
const offsetValueBox = document.querySelector('.offset-value');

const moveValues = {
  1: 4,
  2: 21,
  3: 39,
  4: 56,
  5: 75,
  6: 92,
};

const chooseBtnType = (response) => {
  switch (response.btnStatus) {
    case true:
      playBtn.style.display = 'block';
      pauseBtn.style.display = 'none';
      break;
    case false:
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
      break;
    default:
      throw Error(`No such response type as ${response}`);
  }
};

window.onload = () => {
  chrome.runtime.sendMessage({ button: 'check' }, (response) => {
    chooseBtnType(response);
    speed.value = response.frequency;
    speedValueBox.textContent = speed.value;
    speedValueBox.style.left = `${moveValues[speed.value]}%`;
    offset.value = response.offsetY;
    offsetValueBox.textContent = offset.value;
    offsetValueBox.style.left = `${moveValues[offset.value]}%`;
  });
};

[playBtn, pauseBtn].forEach((btn) => btn.addEventListener('click', () => {
  chrome.runtime.sendMessage({
    button: 'clicked',
    speed: speed.value,
    offset: offset.value,
  }, (response) => chooseBtnType(response));
}));

speed.addEventListener('input', () => {
  speedValueBox.textContent = speed.value;
  speedValueBox.style.left = `${moveValues[speed.value]}%`;
});

offset.addEventListener('input', () => {
  offsetValueBox.textContent = offset.value;
  offsetValueBox.style.left = `${moveValues[offset.value]}%`;
});
