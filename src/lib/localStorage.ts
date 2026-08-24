const gameStateKey = 'gameState'
const practiceGameStateKey = 'practiceGameState'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export const savePracticeGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(practiceGameStateKey, JSON.stringify(gameState))
}

export const loadPracticeGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(practiceGameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export const clearPracticeGameState = () => {
  localStorage.removeItem(practiceGameStateKey)
}

const gameStatKey = 'gameStats'
const practiceStatKey = 'practiceGameStats'

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

export const savePracticeStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(practiceStatKey, JSON.stringify(gameStats))
}

export const loadPracticeStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(practiceStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}