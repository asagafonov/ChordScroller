import startScroll from '../index';

chrome.runtime.onMessage.addListener((request) => {
  switch (request.action) {
    case 'start':
      startScroll(request.frequency);
      break;
    case 'stop':
      startScroll(request.frequency);
      break;
    default:
      throw Error(`No such request as ${request.action}`);
  }
});
