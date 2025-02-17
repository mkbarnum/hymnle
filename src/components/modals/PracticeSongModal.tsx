import { BaseModal } from "./BaseModal";
import { songUrl, solution } from "../../lib/songs";

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

export const PracticeSongModal = ({
  isOpen,
  handleClose,
  guesses,
  isGameLost,
  handleShareToClipboard,
  isHardMode,
  isDarkMode,
}: Props) => {
  return (
    <BaseModal title="" isOpen={isOpen} handleClose={handleClose}>
      <div className={`text-lg font-medium mt-4 ${isDarkMode ? "text-gray-300" : "text-black"}`}>
        Solution:{" "}
        <a
          href={songUrl}
          target="_blank"
          className={`underline font-bold ${isDarkMode ? "text-[#25c77ef5]" : "text-[#185642]"}`}
          rel="noreferrer"
          tabIndex={-1}
        >
          {solution}
        </a>
      </div>
      <div className={`text-base mt-6 ${isDarkMode ? "text-gray-300" : "text-black"}`}>
        Great Job! Keep up the good work.
      </div>
      <div className={`mt-5 sm:mt-6 px-20 ${isDarkMode ? "text-gray-300" : "text-black"}`}>
        <div>
          <button
            type="button"
            className={`mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 ${
              isDarkMode ? "bg-[#185642] text-white hover:bg-[#185642]" : "bg-[#185642] text-white hover:bg-[#185642]"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#185642] sm:text-sm`}
            onClick={() => {
              window.location.reload();
            }}
            tabIndex={-1}
          >
            Play Again
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
