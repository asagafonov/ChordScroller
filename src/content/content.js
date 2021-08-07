import startScroll from '../index';

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'initiate') {
    startScroll(5);
  }
});
