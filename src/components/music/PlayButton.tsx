import { PlayIcon, PauseIcon } from "@heroicons/react/outline";

type Props = {
  isPlaying?: boolean;
  setIsPlaying: (value: boolean) => void;
};

export const PlayButton = ({ isPlaying, setIsPlaying }: Props) => {
  if (!isPlaying) {
    return (
      <div className="flex justify-center mb-5">
        <PlayIcon
          className="w-14 h-14 cursor-pointer dark:stroke-white"
          onClick={() => setIsPlaying(true)}
        />
      </div>
    );
  }
  return (
    <div className="flex justify-center mb-5">
      <PauseIcon
        className="w-14 h-14 cursor-pointer dark:stroke-white"
        onClick={() => setIsPlaying(false)}
      />
    </div>
  );
};
