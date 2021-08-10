const scrollDown = () => window.scrollBy({
  top: 10,
  behavior: 'smooth',
});

let id;

chrome.runtime.onMessage.addListener(({ action, frequency }) => {
  switch (action) {
    case 'start':
      clearInterval(id);
      id = setInterval(scrollDown, frequency);
      break;
    case 'stop':
      clearInterval(id);
      id = undefined;
      break;
    default:
      throw Error(`No such request as ${action}`);
  }
});
