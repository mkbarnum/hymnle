import { BaseModal } from "./BaseModal";
import { shareStatus } from "../../lib/share";
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

export const SongModal = ({
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
        Enjoying Hymnle? Then don't forget to play{" "}
        <a
          href="https://comefollowmedle.com"
          target="_blank"
          className={`underline font-bold ${isDarkMode ? "text-[#25c77ef5]" : "text-[#185642]"}`}
          rel="noreferrer"
          tabIndex={-1}
        >
          Come Follow Medle
        </a>{" "}
        today!
      </div>
      <div className={`mt-5 sm:mt-6 columns-2 ${isDarkMode ? "text-gray-300" : "text-black"}`}>
        <div>
          <button
            type="button"
            className={`mt-2 w-full rounded-md border ${
              isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-[#185642] bg-white text-[#185642]"
            } shadow-sm px-4 py-2 text-base font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#185642] sm:text-sm`}
            onClick={() => {
              handleClose();
            }}
            tabIndex={-1}
          >
            See Stats
          </button>
        </div>
        <div>
          <button
            type="button"
            className={`mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 ${
              isDarkMode ? "bg-[#185642] text-white hover:bg-[#185642]" : "bg-[#185642] text-white hover:bg-[#185642]"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#185642] sm:text-sm`}
            onClick={() => {
              shareStatus(guesses, isGameLost, isHardMode, handleShareToClipboard);
            }}
            tabIndex={-1}
          >
            Share Score
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
