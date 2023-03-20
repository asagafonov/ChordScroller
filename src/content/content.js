import { getKeyByValue, scrollDown, getValuesFromStorage } from '../utils/functions';
import { speedValues, offsetValues } from '../utils/values';

const state = {
  scrolling: false,
  scrollSpeed: {
    offsetY: 20,
    frequency: 2000,
  },
};

let id;

const playPause = (appState) => {
  const { offsetY, frequency } = appState.scrollSpeed;

  switch (appState.scrolling) {
    case true:
      clearInterval(id);
      id = setInterval(() => scrollDown(offsetY), frequency);
      break;
    case false:
      clearInterval(id);
      id = null;
      break;
    default:
      throw Error(`No such scrolling status as ${appState.scrolling}`);
  }
};

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(({ action, frequency, offset }) => {
    switch (action) {
      case 'check': {
        const savedValues = getValuesFromStorage();

        if (savedValues) {
          state.scrollSpeed.offsetY = savedValues.offset;
          state.scrollSpeed.frequency = savedValues.frequency;
        }

        port.postMessage({
          action: 'checked',
          btnStatus: state.scrolling,
          frequency: getKeyByValue(speedValues, state.scrollSpeed.frequency),
          offsetY: getKeyByValue(offsetValues, state.scrollSpeed.offsetY),
        });
        break;
      }
      case 'click':
        state.scrollSpeed.frequency = speedValues[frequency];
        state.scrollSpeed.offsetY = offsetValues[offset];
        state.scrolling = !state.scrolling;
        port.postMessage({ action: 'clicked', btnStatus: state.scrolling });
        playPause(state);
        break;
      case 'input':
        state.scrollSpeed.frequency = speedValues[frequency];
        state.scrollSpeed.offsetY = offsetValues[offset];
        port.postMessage({
          action: 'input-changed',
        });
        localStorage.setItem('chordScrollerValues', JSON.stringify({
          frequency: speedValues[frequency],
          offset: offsetValues[offset],
        }));
        playPause(state);
        break;
      default:
        throw Error(`No such request as ${action}`);
    }
  });
});
