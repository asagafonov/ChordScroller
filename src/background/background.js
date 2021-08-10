import initView from '../view';

const state = {
  scrolling: false,
  scrollSpeed: {
    offsetY: 10,
    frequency: 1000,
  },
};

const watched = initView(state);

chrome.runtime.onMessage.addListener((message) => {
  if (message.button === 'clicked') {
    watched.scrolling = !watched.scrolling;
  }
});
