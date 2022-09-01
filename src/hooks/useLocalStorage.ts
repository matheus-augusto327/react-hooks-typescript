import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // state para ser salvo no localstorage
  const [storagedValue, setStoragedValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storagedValue) : value;

      setStoragedValue(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }
  return [storagedValue, setValue] as const
}

export default useLocalStorage