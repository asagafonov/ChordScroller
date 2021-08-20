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
const inputContainer = document.querySelector('.input-container');

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
      authorLink.style.color = 'rgb(129, 212, 84)';
      break;
    case false:
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
      authorLink.style.color = 'rgb(237, 35, 13)';
      break;
    default:
      throw Error(`No such response type as ${response}`);
  }
};

const handleResponse = (response) => {
  const { action, frequency, offsetY } = response;

  switch (action) {
    case 'checked':
      chooseBtnType(response);
      speed.value = frequency;
      speedValueBox.textContent = speed.value;
      speedValueBox.style.left = `${stepValues.value[speed.value]}%`;
      speedDescriptionBox.style.left = `${stepValues.description.speed[speed.value]}%`;
      speedDescriptionBox.textContent = 'speed';
      offset.value = offsetY;
      offsetValueBox.textContent = offset.value;
      offsetValueBox.style.left = `${stepValues.value[offset.value]}%`;
      offsetDescriptionBox.style.left = `${stepValues.description.offset[offset.value]}%`;
      offsetDescriptionBox.textContent = 'offset';
      break;
    case 'clicked':
      chooseBtnType(response);
      break;
    case 'input-changed':
      speedValueBox.textContent = speed.value;
      speedValueBox.style.left = `${stepValues.value[speed.value]}%`;
      speedDescriptionBox.style.left = `${stepValues.description.speed[speed.value]}%`;
      offsetValueBox.textContent = offset.value;
      offsetValueBox.style.left = `${stepValues.value[offset.value]}%`;
      offsetDescriptionBox.style.left = `${stepValues.description.offset[offset.value]}%`;
      break;
    default:
      throw Error(`No such action as ${response.action}`);
  }
};

const handleDisconnect = () => {
  const errorContainer = document.createElement('div');
  const errorMessageOne = document.createElement('div');
  const errorMessageTwo = document.createElement('div');
  const br = document.createElement('br');

  errorContainer.setAttribute('class', 'error');
  errorMessageOne.textContent = 'ChordScroller couldn\'t establish connection.';
  errorMessageTwo.textContent = 'Please reload this webpage!';
  errorMessageTwo.setAttribute('class', 'error-accent');

  inputContainer.innerHTML = '';

  errorContainer.append(errorMessageOne);
  errorContainer.append(br);
  errorContainer.append(errorMessageTwo);
  inputContainer.append(errorContainer);
};

window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({ action: 'check' });
    port.onMessage.addListener(handleResponse);
    port.onDisconnect.addListener(handleDisconnect);
  });
});

[playBtn, pauseBtn].forEach((btn) => btn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({
      action: 'click',
      frequency: speed.value,
      offset: offset.value,
    });
    port.onMessage.addListener(handleResponse);
    port.onDisconnect.addListener(handleDisconnect);
  });
}));

[speed, offset].forEach((el) => el.addEventListener('input', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({
      action: 'input',
      frequency: speed.value,
      offset: offset.value,
    });
    port.onMessage.addListener(handleResponse);
    port.onDisconnect.addListener(handleDisconnect);
  });
}));

authorLink.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com/asagafonov' });
});
