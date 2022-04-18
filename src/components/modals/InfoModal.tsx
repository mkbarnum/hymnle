import { BaseModal } from "./BaseModal";

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
          href="heardle.app"
          target="_blank"
          className="underline font-bold"
          rel="noreferrer"
        >
          Heardle
        </a>{" "}
        inspired game but with songs from The Church of Jesus Christ of
        Latter-day Saints.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Each day there will be a random song from the Hymn Book or Children's Songbook, and you'll have 6 tries to guess it!
        </p>
      </div>

      <div className="flex justify-center mb-1 mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
        </p>
      </div>
    </BaseModal>
  );
};
