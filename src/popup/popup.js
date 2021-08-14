import './popup.css';

const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const speed = document.querySelector('#rangemeter');
const offset = document.querySelector('#offsetmeter');

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

const colorValues = {
  1: 0,
  2: 20,
  3: 40,
  4: 60,
  5: 80,
  6: 120,
};

window.onload = () => {
  chrome.runtime.sendMessage({ button: 'check' }, (response) => {
    chooseBtnType(response);
    speed.value = response.frequency;
    speed.style.filter = `hue-rotate(-${colorValues[speed.value]}deg)`;
    offset.value = response.offsetY;
    offset.style.filter = `hue-rotate(-${colorValues[offset.value]}deg)`;
  });
};

[playBtn, pauseBtn].forEach((btn) => btn.addEventListener('click', () => {
  chrome.runtime.sendMessage({
    button: 'clicked',
    speed: speed.value,
    offset: offset.value,
  }, (response) => chooseBtnType(response));
}));

[speed, offset].forEach((rangeElement) => rangeElement.addEventListener('input', () => {
  const { value } = rangeElement;
  rangeElement.style.filter = `hue-rotate(-${colorValues[value]}deg)`; // eslint-disable-line
}));
