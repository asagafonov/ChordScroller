const startScroll = (speed) => {
  window.scrollBy({
    top: 10,
    behavior: 'smooth',
  });
  const scrollDelay = setTimeout(startScroll, speed);
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    clearTimeout(scrollDelay);
  }
};

export default startScroll;
