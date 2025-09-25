import { useEffect } from "react";

const useClickSound = () => {
  useEffect(() => {
    const audio = new Audio("../../public/sounds/click.wav");

    const handleClick = () => {
      audio.currentTime = 0;
      audio.play();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useClickSound;
