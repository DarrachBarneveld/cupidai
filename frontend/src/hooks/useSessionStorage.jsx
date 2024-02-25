import { useEffect, useState } from "react";

function useSessionStorage(key) {
  const [value, setValue] = useState(() => {
    return JSON.parse(sessionStorage.getItem(key) || "[]");
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useSessionStorage;
