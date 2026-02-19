import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialExpense) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialExpense;
  });                        // close the useState callback and call

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}