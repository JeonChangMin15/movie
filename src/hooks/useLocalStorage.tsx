import { useState } from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useLocalStorage<T>(key: string, initialValue: T) {
  // localStorage에서 값을 가져옵니다.
  const storedValue = localStorage.getItem(key);
  // 초기 값은 저장된 값이 있으면 파싱하고, 없으면 초기값을 사용합니다.
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  // 상태를 만듭니다.
  const [value, setValue] = useState<T>(initial);

  // 값을 설정하는 함수를 만듭니다.
  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    // 만약 함수가 전달되면 이전 상태 값을 사용하여 새 값을 계산합니다.
    const newValueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    // 상태를 업데이트합니다.
    setValue(newValueToStore);
    // localStorage에 값을 저장합니다.
    localStorage.setItem(key, JSON.stringify(newValueToStore));
  };

  return [value, setStoredValue] as [T, SetValue<T>];
}
