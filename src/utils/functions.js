const getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);

const scrollDown = (offset) => window.scrollBy({ top: offset, behavior: 'smooth' });

const getValuesFromStorage = (id = 'chordScrollerValues') => {
  const data = localStorage.getItem(id);

  if (!data) {
    return { frequency: null, offset: null };
  }

  const { frequency, offset } = JSON.parse(data);
  return {
    frequency: Number(frequency),
    offset: Number(offset),
  };
};

export { getKeyByValue, scrollDown, getValuesFromStorage };
