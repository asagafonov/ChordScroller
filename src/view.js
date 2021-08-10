import onChange from 'on-change';

const sendStatus = (action, frequency, offset) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action, frequency, offset });
  });
};

const playPause = (scrollingStatus, frequency, offset) => {
  switch (scrollingStatus) {
    case true:
      sendStatus('start', frequency, offset);
      break;
    case false:
      sendStatus('stop', frequency, offset);
      break;
    default:
      throw Error(`No such scrolling status as ${scrollingStatus}`);
  }
};

const initView = (state) => {
  const mapping = {
    scrolling: () => playPause(
      state.scrolling,
      state.scrollSpeed.frequency,
      state.scrollSpeed.offsetY,
    ),
  };

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export default initView;
