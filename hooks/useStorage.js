export default function useStorage(driver) {
  if (!driver && typeof window !== 'undefined') {
    driver = window.localStorage;
  }

  const getItem = (key) => {
    if (!driver) return null;
    const item = driver?.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null;
  };

  const setItem = (key, object) => {
    if (!driver) return;
    driver?.setItem(key, JSON.stringify(object));
  };

  const removeItem = (key) => {
    if (!driver) return;
    driver?.removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
}
