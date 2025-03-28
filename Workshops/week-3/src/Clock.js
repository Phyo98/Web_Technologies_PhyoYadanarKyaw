import { useState, useEffect } from "react";

export default function Clock({ time }) {
  const [className, setClassName] = useState("");

  useEffect(() => {
    let hours = time.getHours();
    if (hours >= 0 && hours <= 6) {
      setClassName("night");
    } else {
      setClassName("day");
    }
  }, [time]);

  return <h1 className={className}>{time.toLocaleTimeString()}</h1>;
}
