const prefix = "@stapp";

const setItem = (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    window.localStorage.setItem(`${prefix}-${key}`, stringValue);
  } catch (error) {
    console.error(error);
  }
};

const getItem = (key) => {
  const prefixedKey = `${prefix}-${key}`;
  return window.localStorage.getItem(prefixedKey);
};

const clear = () => window.localStorage.clear();

export { setItem, getItem, clear };
