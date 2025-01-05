import { PracticeGameStats } from '../lib/localStorage'
import {
    TOTAL_TRIES_TEXT,
    SUCCESS_RATE_TEXT,
    CURRENT_STREAK_TEXT,
    BEST_STREAK_TEXT,
} from '../constants/strings'

type Props = {
    practiceGameStats: PracticeGameStats
}

const StatItem = ({
    label,
    value,
}: {
    label: string
    value: string | number
}) => {
    return (
        <div className="items-center justify-center m-1 w-1/4 dark:text-white">
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-xs">{label}</div>
        </div>
    )
}

export const PracticeStatBar = ({ practiceGameStats }: Props) => {
    return (
        <div className="flex justify-center my-2">
            <StatItem label={TOTAL_TRIES_TEXT} value={practiceGameStats.practiceTotalGames} />
            <StatItem label={SUCCESS_RATE_TEXT} value={`${practiceGameStats.practiceSuccessRate}%`} />
            <StatItem label={CURRENT_STREAK_TEXT} value={practiceGameStats.practiceCurrentStreak} />
            <StatItem label={BEST_STREAK_TEXT} value={practiceGameStats.practiceBestStreak} />
        </div>
    )
}
