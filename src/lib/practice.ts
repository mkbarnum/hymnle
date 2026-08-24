import { SONG_OF_THE_DAY } from '../constants/songOfTheDay';
import { UNUSED_SONGS } from '../constants/unusedSongs';

const ALL_PRACTICE_SONGS = [...SONG_OF_THE_DAY, ...UNUSED_SONGS];

export type PracticeSong = {
  solution: string;
  solutionMp3Url: string;
  songUrl: string;
  playFrom: number;
};

export const getRandomSong = (): PracticeSong => {
  const randomIndex = Math.floor(Math.random() * ALL_PRACTICE_SONGS.length);
  const song = ALL_PRACTICE_SONGS[randomIndex];
  const book = (song as any).book;
  const bookSuffix = book === "CHILDREN'S" ? " (Children's)" : "";
  
  return {
    solution: `${song.number}. ${song.title}${bookSuffix}`,
    solutionMp3Url: song.mp3_url,
    songUrl: song.url,
    playFrom: (song as any).playFrom ?? 0,
  };
};

let currentSong = getRandomSong();

export const getCurrentSong = () => currentSong;

export const setNewRandomSong = () => {
  currentSong = getRandomSong();
  return currentSong;
};

export const isWinningSong = (song: string) => {
  return currentSong.solution === song;
};

// For backward compatibility
export const solution = currentSong.solution;
export const solutionMp3Url = currentSong.solutionMp3Url;
export const songUrl = currentSong.songUrl;
export const playFrom = currentSong.playFrom;