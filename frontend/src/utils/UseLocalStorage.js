import { useState } from "react";

export function getStorageItem(key, initialValue) {
  try {
    // 로컬스토리지 접근
    const item = window.localStorage.getItem(key);
    // 값이있으면 storedValue 저장 없으면  ,initialValue

    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // error 일 경우  initialValue 반환
    console.log(error);
    return initialValue;
  }
}

//저장만
export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    console.log(key);
    return getStorageItem(key, initialValue);
  });

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);

    setStorageItem(key, valueToStore);
  };

  return [storedValue, setValue];
}
