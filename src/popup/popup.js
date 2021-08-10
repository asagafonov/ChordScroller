import './popup.css';

const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const speed = document.querySelector('#rangemeter');
const offset = document.querySelector('#offsetmeter');

[playBtn, pauseBtn].forEach((el) => el.addEventListener('click', () => {
  chrome.runtime.sendMessage({
    button: 'clicked',
    speed: speed.value,
    offset: offset.value,
  }, (response) => {
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
