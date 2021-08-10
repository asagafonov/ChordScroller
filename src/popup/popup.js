const button = document.querySelector('.play-pause');

button.addEventListener('click', () => {
  chrome.runtime.sendMessage({ button: 'clicked' });
});
