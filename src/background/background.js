import initView from '../view';

const speedValues = {
  1: 10000,
  2: 5000,
  3: 2000,
  4: 1000,
  5: 750,
  6: 500,
};

const offsetValues = {
  1: 10,
  2: 20,
  3: 30,
  4: 50,
  5: 100,
  6: 200,
};

const state = {
  scrolling: false,
  scrollSpeed: {
    offsetY: 10,
    frequency: 1000,
  },
};

const getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);

const watched = initView(state);

chrome.runtime.onMessage.addListener(({ button, speed, offset }, sender, sendResponse) => {
  switch (button) {
    case 'clicked':
      watched.scrollSpeed.frequency = speedValues[Number(speed)];
      watched.scrollSpeed.offsetY = offsetValues[Number(offset)];
      watched.scrolling = !watched.scrolling;
      sendResponse({ btnStatus: watched.scrolling });
      break;
    case 'check':
      sendResponse({
        btnStatus: watched.scrolling,
        frequency: getKeyByValue(speedValues, watched.scrollSpeed.frequency),
        offsetY: getKeyByValue(offsetValues, watched.scrollSpeed.offsetY),
      });
      break;
    default:
      throw Error(`No such button demand as ${button}`);
  }
});
