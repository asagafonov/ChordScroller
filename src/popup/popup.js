const button = document.querySelector('.play-pause');
const input = document.querySelector('#rangemeter');

button.addEventListener('click', () => {
  chrome.runtime.sendMessage({ button: 'clicked', speed: input.value });
});
