

export function debounce(func,wait = 300) {
  let timeId = null;
  return (...args) => {
    if (timeId !== null) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
        func(...args);
    }, wait);
  };
}