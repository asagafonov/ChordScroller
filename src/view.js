import onChange from 'on-change';

const sendStatus = (status) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: status });
  });
};

const playPause = (scrollingStatus) => {
  switch (scrollingStatus) {
    case true:
      sendStatus('start');
      break;
    case false:
      sendStatus('stop');
      break;
    default:
      throw Error(`No such scrolling status as ${scrollingStatus}`);
  }
};

const initView = (state) => {
  const mapping = {
    scrolling: () => playPause(state.scrolling),
  };

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export default initView;
