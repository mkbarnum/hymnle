import { MAX_CHALLENGES } from '../constants/settings'
import {
    loadPracticeStatsFromLocalStorage,
    savePracticeStatsToLocalStorage,
    PracticeGameStats,
} from '../lib/localStorage'

// In stats array elements 0-5 are successes in 1-6 tries

export const addStatsForCompletedPractice = (
    practiceStats: PracticeGameStats,
    count: number
) => {
    // Count is number of incorrect guesses before end.
    const stats = { ...practiceStats }
    stats.practiceTotalGames += 1

    if (count >= MAX_CHALLENGES) {
        // A fail situation
        stats.practiceCurrentStreak = 0
        stats.practiceGamesFailed += 1
    } else {
        stats.practiceWinDistribution[count - 1] += 1
        stats.practiceCurrentStreak += 1

        if (stats.practiceBestStreak < stats.practiceCurrentStreak) {
            stats.practiceBestStreak = stats.practiceCurrentStreak
        }
    }

    stats.practiceSuccessRate = getPracticeSuccessRate(stats)

    savePracticeStatsToLocalStorage(stats)
    return stats
}

const defaultPracticeStats: PracticeGameStats = {
    practiceWinDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
    practiceGamesFailed: 0,
    practiceCurrentStreak: 0,
    practiceBestStreak: 0,
    practiceTotalGames: 0,
    practiceSuccessRate: 0,
}

export const loadPracticeStats = () => {
    return loadPracticeStatsFromLocalStorage() || defaultPracticeStats
}

const getPracticeSuccessRate = (practiceStats: PracticeGameStats) => {
    const { practiceTotalGames, practiceGamesFailed } = practiceStats

    return Math.round(
        (100 * (practiceTotalGames - practiceGamesFailed)) / Math.max(practiceTotalGames, 1)
    )
}
