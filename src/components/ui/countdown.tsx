"use client";

import { useEffect, useState } from "react";

export default function Countdown({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const targetDate = new Date("2025-04-08T00:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) return "00d 00h 00m 00s";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${String(days).padStart(2, "0")}d ${String(hours).padStart(
      2,
      "0",
    )}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(
      2,
      "0",
    )}s`;
  };

  const [timeLeft, setTimeLeft] = useState<string>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="countdown" className={className}>
      {text.replace("%t", timeLeft)}
    </div>
  );
}
