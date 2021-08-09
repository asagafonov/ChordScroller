import startScroll from '../index';

chrome.runtime.onMessage.addListener(({ action, frequency }) => {
  switch (action) {
    case 'start':
      startScroll(frequency);
      break;
    case 'stop':
      startScroll(frequency);
      break;
    default:
      throw Error(`No such request as ${action}`);
  }
});
