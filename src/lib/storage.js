const prefix = "@stapp";

const setItem = (key, value) => {
  try {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(`${prefix}-${key}`, stringValue);
  } catch (error) {
    console.error(error);
  }
};

const getItem = (key) => {
  const prefixedKey = `${prefix}-${key}`;
  return window.localStorage.getItem(prefixedKey);
};

const removeItem = (key) => {
  const prefixedKey = `${prefix}-${key}`;
  return window.localStorage.removeItem(prefixedKey);
};

const clear = () => window.localStorage.clear();

export const storage = { setItem, getItem, clear, removeItem };
