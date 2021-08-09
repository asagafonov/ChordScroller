const startScroll = (offset = 10, seconds = 1000) => {
  window.scrollBy({
    top: offset,
    behavior: 'smooth',
  });
  const scrollDelay = setTimeout(startScroll, seconds);

  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    clearTimeout(scrollDelay);
  }
};

export default startScroll;
