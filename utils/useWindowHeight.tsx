import { useState, useEffect } from "react";
export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState<number>(1);
  useEffect(() => {
    const listener = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", listener);
    listener();
    return () => window.removeEventListener("resize", listener);
  }, [window]);
  return windowHeight;
};
