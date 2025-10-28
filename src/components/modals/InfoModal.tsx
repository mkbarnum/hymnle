import { BaseModal } from "./BaseModal";
import { MusicNoteIcon, LockOpenIcon, EmojiHappyIcon } from "@heroicons/react/outline"

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        A {" "}
        <a
          href="https://10s.heardledecades.com/"
          target="_blank"
          className="underline font-bold"
          rel="noreferrer"
          tabIndex={-1}
        >
          Heardle
        </a>{" "}
        inspired game but with songs from the Hymnal or The Children's Songbook
      </p>

      <div className="flex justify-center mb-1 mt-4">
      <MusicNoteIcon className = "text-[#185642] dark:text-gray-300 mr-2 w-7"/>
        <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
        Listen to the intro of the song, then guess the correct title.
        </p>
      </div>

      <div className="flex justify-center mb-1 mt-4">
        <LockOpenIcon className = "text-[#185642] dark:text-gray-300 mr-2 w-7" />
        <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
        Skipped or incorrect attempts unlock more of the intro.
        </p>
      </div>

      <div className="flex justify-center mb-1 mt-4">
        <EmojiHappyIcon className = "text-[#185642] dark:text-gray-300 mr-2 w-7"/>
        <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
          Answer in as few tries as possible and share your score!
        </p>
      </div>
        


      <div className="flex justify-center mb-1 mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
        All the songs used in the game are copyrighted and belong to their respective owners.
      </p>
      </div>

      <div className="flex justify-center mb-1 mt-4">
        <a
          href="/legal.html"
          target="_blank"
          className="text-xs text-gray-400 dark:text-gray-500 underline hover:text-gray-600 dark:hover:text-gray-300"
          rel="noreferrer"
          tabIndex={-1}
        >
          Legal Disclaimer
        </a>
      </div>
    </BaseModal>
  );
};
