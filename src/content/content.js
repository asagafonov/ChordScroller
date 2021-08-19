const speedValues = {
  1: 6000,
  2: 4000,
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
    offsetY: 20,
    frequency: 1000,
  },
  input: 0,
};

const getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);

const scrollDown = (offset) => window.scrollBy({
  top: offset,
  behavior: 'smooth',
});

let id;

const playPause = (scrollingStatus) => {
  const { offsetY, frequency } = state.scrollSpeed;

  switch (scrollingStatus) {
    case true:
      clearInterval(id);
      id = setInterval(() => scrollDown(offsetY), frequency);
      break;
    case false:
      clearInterval(id);
      id = undefined;
      break;
    default:
      throw Error(`No such scrolling status as ${scrollingStatus}`);
  }
};

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((request) => {
    const { action, frequency, offset } = request;

    switch (action) {
      case 'start':
        clearInterval(id);
        id = setInterval(() => scrollDown(offset), frequency);
        break;
      case 'stop':
        clearInterval(id);
        id = undefined;
        break;
      case 'check':
        port.postMessage({
          action: 'checked',
          btnStatus: state.scrolling,
          frequency: getKeyByValue(speedValues, state.scrollSpeed.frequency),
          offsetY: getKeyByValue(offsetValues, state.scrollSpeed.offsetY),
        });
        break;
      case 'click':
        state.scrollSpeed.frequency = speedValues[frequency];
        state.scrollSpeed.offsetY = offsetValues[offset];
        state.scrolling = !state.scrolling;
        port.postMessage({ action: 'clicked', btnStatus: state.scrolling });
        playPause(state.scrolling);
        break;
      case 'input':
        state.scrollSpeed.frequency = speedValues[frequency];
        state.scrollSpeed.offsetY = offsetValues[offset];
        port.postMessage({
          action: 'input-changed',
        });
        playPause(state.scrolling);
        break;
      default:
        throw Error(`No such request as ${action}`);
    }
  });
});
