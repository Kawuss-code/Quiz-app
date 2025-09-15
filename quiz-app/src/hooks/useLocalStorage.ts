import { useState, useEffect } from "react";

/**
 * Prosty generyczny hook useLocalStorage z obsługą funkcjonalnego settera.
 * - key: klucz w localStorage
 * - initialValue: wartość początkowa (np. [] lub null)
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      // np. brak miejsca lub zablokowany dostęp
      console.warn("useLocalStorage: could not save", err);
    }
  }, [key, state]);

  // setter obsługujący zarówno wartość, jak i funkcję (prev => new)
  const setStoredValue = (val: T | ((prev: T) => T)) => {
    setState((prev) =>
      typeof val === "function" ? (val as (p: T) => T)(prev) : val
    );
  };

  return [state, setStoredValue] as const;
}
