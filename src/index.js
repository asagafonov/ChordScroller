const startScroll = (speed) => {
  window.scrollBy({
    top: speed,
    left: 0,
    behavior: 'smooth',
  });
  const scrollDelay = setTimeout(startScroll, 100);
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    clearTimeout(scrollDelay);
  }
};

export default startScroll;
