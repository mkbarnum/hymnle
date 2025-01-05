const gameStateKey = 'gameState'

type StoredGameState = {
  mode: 'game' | 'practice'
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (): StoredGameState | null => {
  const state = localStorage.getItem('gameState');
  return state ? (JSON.parse(state) as StoredGameState) : null;
}


const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

const practiceGameStatsKey = 'practiceGameStats'

export type PracticeGameStats = {
  practiceWinDistribution: number[]
  practiceGamesFailed: number
  practiceCurrentStreak: number
  practiceBestStreak: number
  practiceTotalGames: number
  practiceSuccessRate: number
}

export const savePracticeStatsToLocalStorage = (practiceStats: PracticeGameStats) => {
  localStorage.setItem(practiceGameStatsKey, JSON.stringify(practiceStats))
}

export const loadPracticeStatsFromLocalStorage = (): PracticeGameStats | null => {
  const stats = localStorage.getItem(practiceGameStatsKey)
  return stats ? (JSON.parse(stats) as PracticeGameStats) : null
}
