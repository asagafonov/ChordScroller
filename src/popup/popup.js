import './popup.css';
import { stepValues } from '../utils/values';
import elements from '../utils/elements';

const {
  playBtn,
  pauseBtn,
  frqMeter,
  offsetMeter,
  frqValueBox,
  offsetValueBox,
  frqDescriptionBox,
  offsetDescriptionBox,
  authorLink,
  inputContainer,
} = elements;

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
      frqMeter.value = frequency;
      frqValueBox.textContent = frqMeter.value;
      frqValueBox.style.left = `${stepValues.value[frqMeter.value]}%`;
      frqDescriptionBox.style.left = `${stepValues.description.speed[frqMeter.value]}%`;
      frqDescriptionBox.textContent = 'speed';
      offsetMeter.value = offsetY;
      offsetValueBox.textContent = offsetMeter.value;
      offsetValueBox.style.left = `${stepValues.value[offsetMeter.value]}%`;
      offsetDescriptionBox.style.left = `${stepValues.description.offset[offsetMeter.value]}%`;
      offsetDescriptionBox.textContent = 'offset';
      break;
    case 'clicked':
      chooseBtnType(response);
      break;
    case 'input-changed':
      frqValueBox.textContent = frqMeter.value;
      frqValueBox.style.left = `${stepValues.value[frqMeter.value]}%`;
      frqDescriptionBox.style.left = `${stepValues.description.speed[frqMeter.value]}%`;
      offsetValueBox.textContent = offsetMeter.value;
      offsetValueBox.style.left = `${stepValues.value[offsetMeter.value]}%`;
      offsetDescriptionBox.style.left = `${stepValues.description.offset[offsetMeter.value]}%`;
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
  errorMessageTwo.textContent = 'Refreshing the page may fix this problem.';
  errorMessageTwo.setAttribute('class', 'error error-accent');

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
      frequency: frqMeter.value,
      offset: offsetMeter.value,
    });
    port.onMessage.addListener(handleResponse);
    port.onDisconnect.addListener(handleDisconnect);
  });
}));

[frqMeter, offsetMeter].forEach((el) => el.addEventListener('input', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({
      action: 'input',
      frequency: frqMeter.value,
      offset: offsetMeter.value,
    });
    port.onMessage.addListener(handleResponse);
    port.onDisconnect.addListener(handleDisconnect);
  });
}));

authorLink.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com/asagafonov' });
});
