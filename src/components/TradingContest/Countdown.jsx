import { useEffect, useState } from "react";

export default function CountdownTimer() {
  // 👉 Set contest end date (May 8, 00:00 UTC)
  const targetDate = new Date("2026-05-20T00:00:00Z").getTime();

  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft <= 0) {
    return (
      <div className="text-center text-red-400 font-semibold">
        Contest Ended
      </div>
    );
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const Box = ({ label, value }) => (
    <div className="
      flex flex-col items-center px-4 py-3
      bg-white/5 border border-white/10
      rounded-xl backdrop-blur-md
      min-w-[60px]
    ">
      <span className="text-lg md:text-2xl font-bold text-green-400">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
      <Box label="Days" value={days} />
      <Box label="Hours" value={hours} />
      <Box label="Min" value={minutes} />
      <Box label="Sec" value={seconds} />
    </div>
  );
}