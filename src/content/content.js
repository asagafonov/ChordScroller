import startScroll from '../index';

chrome.runtime.onMessage.addListener((request) => {
  switch (request.action) {
    case 'start':
      startScroll(true);
      break;
    case 'stop':
      startScroll(false);
      break;
    default:
      throw Error(`No such request as ${request.action}`);
  }
});
