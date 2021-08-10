const scrollDown = (offset) => window.scrollBy({
  top: offset,
  behavior: 'smooth',
});

let id;

chrome.runtime.onMessage.addListener(({ action, frequency, offset }) => {
  switch (action) {
    case 'start':
      clearInterval(id);
      id = setInterval(() => scrollDown(offset), frequency);
      break;
    case 'stop':
      clearInterval(id);
      id = undefined;
      break;
    default:
      throw Error(`No such request as ${action}`);
  }
});
