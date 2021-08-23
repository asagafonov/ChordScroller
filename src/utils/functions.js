const getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);

const scrollDown = (offset) => window.scrollBy({
  top: offset,
  behavior: 'smooth',
});

export { getKeyByValue, scrollDown };
