import { BaseModal } from "./BaseModal";
import { GameStats } from "../../lib/localStorage";
import { StatBar } from "../stats/StatBar";
import { Histogram } from "../stats/Histogram";
import { GUESS_DISTRIBUTION_TEXT } from "../../constants/strings";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  isGameLost: boolean;
  isGameWon: boolean;
  handleShareToClipboard: () => void;
  isHardMode: boolean;
  isDarkMode: boolean;
  solution: string;
  songUrl: string;
  onPlayAgain: () => void;
  practiceStats: GameStats;
};

export const PracticeSongModal = ({
  isOpen,
  handleClose,
  guesses,
  isGameLost,
  handleShareToClipboard,
  isHardMode,
  isDarkMode,
  solution,
  songUrl,
  onPlayAgain,
  practiceStats,
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
      
      <StatBar gameStats={practiceStats} />
      
      {practiceStats.totalGames > 0 && (
        <>
          <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
            {GUESS_DISTRIBUTION_TEXT}
          </h4>
          <Histogram
            gameStats={practiceStats}
            numberOfGuessesMade={guesses.length}
          />
        </>
      )}

      <div className={`mt-5 sm:mt-6 px-20 ${isDarkMode ? "text-gray-300" : "text-black"}`}>
        <button
          type="button"
          className={`mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 ${
            isDarkMode ? "bg-[#185642] text-white hover:bg-[#185642]" : "bg-[#185642] text-white hover:bg-[#185642]"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#185642] sm:text-sm`}
          onClick={onPlayAgain}
          tabIndex={-1}
        >
          Play Again
        </button>
      </div>
    </BaseModal>
  );
};
