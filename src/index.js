const startScroll = (frequency = 1000) => {
  window.scrollBy({
    top: 10,
    behavior: 'smooth',
  });
  const scrollDelay = setTimeout(startScroll, frequency);

  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    clearTimeout(scrollDelay);
  }
};

export default startScroll;
