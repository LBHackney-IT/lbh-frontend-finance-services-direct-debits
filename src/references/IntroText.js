import React, { useEffect, useState } from "react";

const IntroText = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);
  }, []);

  const words = ["beautiful", "home", "me"];
  const currentWord = words[count];

  return <h1>Hackey is {currentWord}</h1>;
};

export default IntroText;
