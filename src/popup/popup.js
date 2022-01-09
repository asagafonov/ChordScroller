import './popup.css';
import usePort from '../utils/port';
import { handleResponse, handleDisconnect } from '../utils/handlers';
import elements from '../utils/elements';

const {
  playBtn, pauseBtn, frqMeter, offsetMeter, authorLink,
} = elements;

window.addEventListener('DOMContentLoaded', () => {
  usePort(
    { action: 'check' },
    handleResponse,
    handleDisconnect,
  );
});

[playBtn, pauseBtn].forEach((btn) => btn.addEventListener('click', () => {
  usePort(
    {
      action: 'click',
      frequency: frqMeter.value,
      offset: offsetMeter.value,
    },
    handleResponse,
    handleDisconnect,
  );
}));

[frqMeter, offsetMeter].forEach((el) => el.addEventListener('input', () => {
  usePort(
    {
      action: 'input',
      frequency: frqMeter.value,
      offset: offsetMeter.value,
    },
    handleResponse,
    handleDisconnect,
  );
}));

authorLink.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://asagafonov.com' });
});
