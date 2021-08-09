import onChange from 'on-change';

const sendStatus = (action, frequency) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action, frequency });
  });
};

const playPause = (scrollingStatus, frequency) => {
  switch (scrollingStatus) {
    case true:
      sendStatus('start', frequency);
      break;
    case false:
      sendStatus('stop', frequency);
      break;
    default:
      throw Error(`No such scrolling status as ${scrollingStatus}`);
  }
};

const initView = (state) => {
  const mapping = {
    scrolling: () => playPause(state.scrolling, state.scrollSpeed.frequency),
  };

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export default initView;
