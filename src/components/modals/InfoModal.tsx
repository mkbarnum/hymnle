import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

import { CFM_URL } from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The words relate to this week's {' '}
        <a
          href={CFM_URL}
          target="_blank"
          className="underline font-bold" rel="noreferrer"
        >
          Come Follow Me
        </a>{' '} Lesson. There is a new word daily.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="I"
          status="correct"
        />
        <Cell value="S" />
        <Cell value="A" />
        <Cell value="A" />
        <Cell value="C" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter I is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="J" />
        <Cell value="A" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="C"
          status="present"
        />
        <Cell value="O" />
        <Cell value="B" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter C is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="E" />
        <Cell value="G" />
        <Cell value="Y" />
        <Cell isRevealing={true} isCompleted={true} value="P" status="absent" />
        <Cell value="T" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter P is not in the word in any spot.
      </p>

    </BaseModal>
  )
}
