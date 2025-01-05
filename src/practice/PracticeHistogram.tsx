import { PracticeGameStats } from '../lib/localStorage'
import { Progress } from '../components/stats/Progress'

type Props = {
    practiceGameStats: PracticeGameStats
    numberOfGuessesMade: number
}

export const PracticeHistogram = ({ practiceGameStats, numberOfGuessesMade }: Props) => {
    const winDistribution = practiceGameStats.practiceWinDistribution
    const maxValue = Math.max(...winDistribution)

    return (
        <div className="columns-1 justify-left m-2 text-sm dark:text-white">
            {winDistribution.map((value, i) => (
                <Progress
                    key={i}
                    index={i}
                    currentDayStatRow={numberOfGuessesMade === i + 1}
                    size={90 * (value / maxValue)}
                    label={String(value)}
                />
            ))}
        </div>
    )
}
