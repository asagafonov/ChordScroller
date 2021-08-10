import initView from '../view';

const speedValues = {
  1: 2500,
  2: 2000,
  3: 1500,
  4: 1000,
  5: 750,
  6: 500,
};

const state = {
  scrolling: false,
  scrollSpeed: {
    offsetY: 10,
    frequency: 1000,
  },
};

const watched = initView(state);

chrome.runtime.onMessage.addListener(({ button, speed }, sender, sendResponse) => {
  if (button === 'clicked') {
    watched.scrollSpeed.frequency = speedValues[Number(speed)];
    watched.scrolling = !watched.scrolling;
    sendResponse(watched.scrolling);
  }
});
