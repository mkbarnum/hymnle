import { BaseModal } from "./BaseModal";
import { shareStatus } from "../../lib/share";
import { ShareIcon, ChartBarIcon } from "@heroicons/react/outline";
import { songUrl, solution } from "../../lib/songs";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  isGameLost: boolean;
  isGameWon: boolean;
  handleShareToClipboard: () => void;
  isHardMode: boolean;
  isDarkMode: boolean;
};

export const SongModal = ({
  isOpen,
  handleClose,
  guesses,
  isGameLost,
  handleShareToClipboard,
  isHardMode,
  isDarkMode,
}: Props) => {
  const navigate = useNavigate();
  return (
    <BaseModal title="" isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-5 text-center text-lg font-medium dark:text-white px-4">
        Solution:{" "}
        <a
          href={songUrl}
          target="_blank"
          className="underline font-bold text-[#185642] dark:text-[#25c77ef5]"
          rel="noreferrer"
        >
          {solution}
        </a>
      </div>
      <div className="mt-5 flex justify-center gap-6">
        <button
          type="button"
          className="flex items-center justify-center w-20 h-12 rounded-md bg-[#185642] border border-[#185642] shadow-sm hover:bg-[#1a6b50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#185642]"
          onClick={() => {
            shareStatus(guesses, isGameLost, isHardMode, handleShareToClipboard);
          }}
          aria-label="Share Score"
        >
          <ShareIcon className="h-6 w-6 text-white" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-20 h-12 rounded-md bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#185642] dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
          onClick={() => {
            handleClose();
          }}
          aria-label="See Stats"
        >
          <ChartBarIcon className="h-6 w-6 text-[#185642] dark:text-[#25c77ef5]" />
        </button>
      </div>
      <hr className="mt-4 mb-3 mx-auto max-w-md border-gray-200 dark:border-gray-600" />
      <div className="flex justify-center items-center gap-8 text-sm">
        <a
          href="https://comefollowmedle.com"
          target="_blank"
          className="underline font-bold text-[#185642] dark:text-[#25c77ef5]"
          rel="noreferrer"
          tabIndex={-1}
        >
          Come Follow Medle
        </a>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <button
          className="underline font-bold text-[#185642] dark:text-[#25c77ef5]"
          onClick={() => {
            handleClose();
            navigate('/practice');
          }}
          tabIndex={-1}
        >
          Endless Mode
        </button>
      </div>
    </BaseModal>
  );
};
