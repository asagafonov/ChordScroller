import './popup.css';

const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const input = document.querySelector('#rangemeter');

[playBtn, pauseBtn].forEach((el) => el.addEventListener('click', () => {
  chrome.runtime.sendMessage({ button: 'clicked', speed: input.value }, (response) => {
    switch (response) {
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
  });
}));
