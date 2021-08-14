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

chrome.runtime.sendMessage({ button: 'check' }, (response) => {
  chooseBtnType(response);
  speed.value = response.frequency;
  offset.value = response.offsetY;
});

[playBtn, pauseBtn].forEach((btn) => btn.addEventListener('click', () => {
  chrome.runtime.sendMessage({
    button: 'clicked',
    speed: speed.value,
    offset: offset.value,
  }, (response) => chooseBtnType(response));
}));
