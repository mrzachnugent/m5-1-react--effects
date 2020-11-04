import { useEffect } from "react";

const useKeydown = (code, callback) => {
  const handleKeyDown = (e) => {
    if (e.code === code) {
      callback();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
};

export default useKeydown;
