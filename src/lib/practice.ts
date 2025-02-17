import { UploadIcon } from '@heroicons/react/outline';
import { SONGS } from '../constants/allSongs';

// export const getRandomSong = () => {
//   const randomIndex = Math.floor(Math.random() * 598); // Get a random index from 0 to 597
//   const song = SONGS[randomIndex];

//   let bookSuffix = song.book === "CHILDREN'S" ? " (Children's)" : "";
//   let solution = `${song.number}. ${song.title}${bookSuffix}`;

//   return {
//     solution,
//     solutionIndex: randomIndex,
//     solutionMp3Url: song.mp3_url,
//     songUrl: song.url,
//   };
// };

export const getRandomSong = () => {
    return {
    solution: "Never Gonna Give You Up",
    solutionMp3Url: "/rick.MP3",
    songUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  };
}

export let { solution, solutionMp3Url, songUrl } = getRandomSong();

export const isWinningSong = (song: string) => {
  return solution === song;
};