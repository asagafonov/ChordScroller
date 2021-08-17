import './popup.css';

const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const speed = document.querySelector('#frq-meter');
const offset = document.querySelector('#offset-meter');
const speedValueBox = document.querySelector('.speed-value');
const offsetValueBox = document.querySelector('.offset-value');
const speedDescriptionBox = document.querySelector('.speed-description');
const offsetDescriptionBox = document.querySelector('.offset-description');
const authorLink = document.querySelector('.author-name');

const stepValues = {
  value: {
    1: 4,
    2: 21,
    3: 39,
    4: 56,
    5: 75,
    6: 92,
  },
  description: {
    speed: {
      1: 1,
      2: 13,
      3: 31,
      4: 49,
      5: 67,
      6: 79,
    },
    offset: {
      1: 1,
      2: 14,
      3: 32,
      4: 50,
      5: 68,
      6: 81,
    },
  },
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

window.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ button: 'check' }, (response) => {
    chooseBtnType(response);
    speed.value = response.frequency;
    speedValueBox.textContent = speed.value;
    speedValueBox.style.left = `${stepValues.value[speed.value]}%`;
    speedDescriptionBox.style.left = `${stepValues.description.speed[speed.value]}%`;
    offset.value = response.offsetY;
    offsetValueBox.textContent = offset.value;
    offsetValueBox.style.left = `${stepValues.value[offset.value]}%`;
    offsetDescriptionBox.style.left = `${stepValues.description.offset[offset.value]}%`;
  });
});

[playBtn, pauseBtn].forEach((btn) => btn.addEventListener('click', () => {
  chrome.runtime.sendMessage({
    button: 'clicked',
    speed: speed.value,
    offset: offset.value,
  }, (response) => chooseBtnType(response));
}));

speed.addEventListener('input', () => {
  chrome.runtime.sendMessage({
    button: 'input',
    speed: speed.value,
    offset: offset.value,
  });
  speedValueBox.textContent = speed.value;
  speedValueBox.style.left = `${stepValues.value[speed.value]}%`;
  speedDescriptionBox.style.left = `${stepValues.description.speed[speed.value]}%`;
});

offset.addEventListener('input', () => {
  chrome.runtime.sendMessage({
    button: 'input',
    speed: speed.value,
    offset: offset.value,
  });
  offsetValueBox.textContent = offset.value;
  offsetValueBox.style.left = `${stepValues.value[offset.value]}%`;
  offsetDescriptionBox.style.left = `${stepValues.description.offset[offset.value]}%`;
});

authorLink.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com/asagafonov' });
});
