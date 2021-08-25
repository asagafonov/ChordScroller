import './popup.css';
import { handleResponse, handleDisconnect } from '../utils/handlers';
import elements from '../utils/elements';

const {
  playBtn, pauseBtn, frqMeter, offsetMeter, authorLink,
} = elements;

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
