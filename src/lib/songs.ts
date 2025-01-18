import { SONG_OF_THE_DAY } from '../constants/songOfTheDay';

export const getSongOfDay = () => {
  const epochMs = new Date(2024, 11, 30).valueOf(); // Start date of game, Dec 30th, 2024
  const msInDay = 86400000;
  const index = Math.floor((Date.now() - epochMs) / msInDay);
  const nextday = ((index + 1) * msInDay) + epochMs;

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let daysFromToday = params.get('i') ? params.get('i') : 0;

  const song = SONG_OF_THE_DAY[(index % SONG_OF_THE_DAY.length) + Number(daysFromToday)];
  let bookSuffix = song.book === "CHILDREN'S" ? " (Children's)" : "";
  let solution = `${song.number}. ${song.title}${bookSuffix}`;
  const playFrom = song.playFrom ?? 0;

  return {
    solution,
    solutionIndex: index,
    tomorrow: nextday,
    solutionMp3Url: song.mp3_url,
    songUrl: song.url,
    playFrom: playFrom
  };
};

export let { solution, solutionIndex, tomorrow, solutionMp3Url, songUrl, playFrom } = getSongOfDay();

export const isWinningSong = (song: string) => {
  return solution === song;
};