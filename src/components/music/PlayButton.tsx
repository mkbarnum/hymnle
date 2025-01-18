import { PauseIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import { useEffect, useState, useRef } from "react";

type Props = {
  audioUrl: string;
  playDuration: number;
  isDarkMode: boolean;
  autoPlay?: boolean;
  playFrom?: number;
};

export const PlayButton = ({ audioUrl, playDuration, isDarkMode = false, autoPlay = false, playFrom = 0 }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(playDuration);
  const [isFirstPlayback, setIsFirstPlayback] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    audio.load();

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [audioUrl]);

  useEffect(() => {
    // Reset timer and remaining time when playDuration changes
    setRemainingTime(playDuration);
    if (isPlaying) {
      resetAudioAndTimer();
    }
  }, [playDuration]);

  useEffect(() => {
    if (autoPlay && !isPlaying) {
      // Add 2-second delay before starting playback and reduce volume
      const autoPlayTimeout = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.5; // 50% quieter
        }
        resetAudioAndTimer();
      }, 2500);

      return () => clearTimeout(autoPlayTimeout); // Clean up timeout on unmount or dependency change
    }
  }, [autoPlay]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const resetAudioAndTimer = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = playFrom / 1000;
    setRemainingTime(playDuration);

    console.log(playFrom)

    // Determine the buffer dynamically
    const buffer = isFirstPlayback ? 0 : 100; // Add 50ms buffer only after the first playback

    audio.volume = autoPlay ? 0.5 : 1; // Adjust volume for autoPlay
    audio.play().then(() => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
        setRemainingTime(playDuration);
      }, playDuration * 1000 + buffer); // Apply the buffer conditionally
    });

    // Set the flag to false after the first playback
    if (isFirstPlayback) {
      setIsFirstPlayback(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || isLoading) return;

    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audio.volume = 1; // Reset to full volume for manual play
      resetAudioAndTimer();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex items-center">
        {isLoading ? (
          <div className="w-14 h-14 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-400"></div>
          </div>
        ) : isPlaying ? (
          <PauseIcon
            className={`w-14 h-14 cursor-pointer ${
              isDarkMode ? "text-gray-500" : "text-[#185642]"
            }`}
            onClick={togglePlayPause}
          />
        ) : (
          <PlayIcon
            className={`w-14 h-14 cursor-pointer ${
              isDarkMode ? "text-gray-300" : "text-[#185642]"
            }`}
            onClick={togglePlayPause}
          />
        )}
      </div>
      <div
        className={`text-xl font-semibold ${
          isDarkMode ? "text-gray-300" : "text-[#185642]"
        }`}
      >
        {formatTime(remainingTime)}
      </div>
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};
