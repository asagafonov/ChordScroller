import './popup.css';
import playButton from '../assets/play-button.png';
import stopButton from '../assets/stop-button.png';

const button = document.querySelector('.play-pause');

button.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'initiate' });
  });
});
