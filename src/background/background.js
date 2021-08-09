import initView from '../view';

const state = {
  scrolling: false,
  scrollSpeed: {
    offsetY: 10,
    frequency: 1000,
  },
};

const watched = initView(state);

chrome.action.onClicked.addListener(() => {
  watched.scrolling = !watched.scrolling;
});
