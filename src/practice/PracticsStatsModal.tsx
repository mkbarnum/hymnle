import Countdown from 'react-countdown'
import { PracticeStatBar } from './PracticeStatBar'
import { PracticeHistogram } from './PracticeHistogram'
import { PracticeGameStats } from '../lib/localStorage'
import { shareStatus } from '../lib/share'
import { tomorrow } from '../lib/songs'
import { BaseModal } from '../components/modals/BaseModal'
import {
    STATISTICS_TITLE,
    GUESS_DISTRIBUTION_TEXT,
    NEW_SONG_TEXT
} from '../constants/strings'

type Props = {
    isOpen: boolean
    handleClose: () => void
    guesses: string[]
    gameStats: PracticeGameStats
    isGameLost: boolean
    isGameWon: boolean
    handleShareToClipboard: () => void
    isHardMode: boolean
    isDarkMode: boolean
    numberOfGuessesMade: number
}

export const PracticeStatsModal = ({
    isOpen,
    handleClose,
    guesses,
    gameStats,
    isGameLost,
    isGameWon,
    handleShareToClipboard,
    isHardMode,
    isDarkMode,
    numberOfGuessesMade,
}: Props) => {
    if (gameStats.practiceTotalGames <= 0) {
        return (
            <BaseModal
                title={STATISTICS_TITLE}
                isOpen={isOpen}
                handleClose={handleClose}
            >
                <PracticeStatBar practiceGameStats={gameStats} />
            </BaseModal>
        )
    }
    return (
        <BaseModal
            title={STATISTICS_TITLE}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <PracticeStatBar practiceGameStats={gameStats} />
            <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                {GUESS_DISTRIBUTION_TEXT}
            </h4>
            <PracticeHistogram
                practiceGameStats={gameStats}
                numberOfGuessesMade={numberOfGuessesMade}
            />
            {(isGameLost || isGameWon) && (
                <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
                    <div>
                        <h5>{NEW_SONG_TEXT}</h5>
                        <Countdown
                            className="text-lg font-medium text-gray-900 dark:text-gray-100"
                            date={tomorrow}
                            daysInHours={true}
                        />
                    </div>
                    <button
                        type="button"
                        className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#185642] text-base font-medium text-white hover:bg-[#185642] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#185642] sm:text-sm"
                        onClick={() => {
                            shareStatus(
                                guesses,
                                isGameLost,
                                isHardMode,
                                handleShareToClipboard
                            )
                        }}
                    >
                        Share Score
                    </button>
                </div>
            )}
        </BaseModal>
    )
}
