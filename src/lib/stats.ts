import { MAX_CHALLENGES } from '../constants/settings'
import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
  loadPracticeStatsFromLocalStorage,
  savePracticeStatsToLocalStorage,
} from './localStorage'

// In stats array elements 0-5 are successes in 1-6 trys

const defaultStats: GameStats = {
  winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats
  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}

const updateStats = (gameStats: GameStats, count: number): GameStats => {
  const stats = { ...gameStats }
  stats.totalGames += 1

  if (count > MAX_CHALLENGES) {
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else {
    stats.winDistribution[count - 1] += 1
    stats.currentStreak += 1
    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getSuccessRate(stats)
  return stats
}

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  const stats = updateStats(gameStats, count)
  saveStatsToLocalStorage(stats)
  return stats
}

export const addPracticeStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  const stats = updateStats(gameStats, count)
  savePracticeStatsToLocalStorage(stats)
  return stats
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

export const loadPracticeStats = () => {
  return loadPracticeStatsFromLocalStorage() || { ...defaultStats }
}
