const get = <T = any>(key: string, defaultValue?: T) => {
  try {
    const storedValue: T | null = JSON.parse(localStorage.getItem(key) as any);

    return storedValue ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

const set = <T = any>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const clear = localStorage.clear;

const remove = localStorage.removeItem;

const LocalStorage = { get, set, clear, remove };

export default LocalStorage;
