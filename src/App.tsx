import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { InfoModal } from "./components/modals/InfoModal";
import { StatsModal } from "./components/modals/StatsModal";
import { SongModal } from "./components/modals/SongModal";
import { SettingsModal } from "./components/modals/SettingsModal";

import {
  WIN_MESSAGE,
  GAME_COPIED_MESSAGE,
  CORRECT_SONG_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
} from "./constants/strings";
import {
  MAX_CHALLENGES,
  WELCOME_INFO_MODAL_MS,
} from "./constants/settings";
import {
  isWinningSong,
  solution,
  solutionMp3Url
} from "./lib/songs";
import { addStatsForCompletedGame, loadStats } from "./lib/stats";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";

import "./App.css";
import { AlertContainer } from "./components/alerts/AlertContainer";
import { useAlert } from "./context/AlertContext";
import { Navbar } from "./components/navbar/Navbar";
import { PlayButton } from "./components/music/PlayButton";
import { SearchBar } from "./components/music/SearchBar";
import { SubmitButton } from "./components/music/SubmitButton";
import { SkipButton } from "./components/music/SkipButton";
import { GameRows } from "./components/grid/GameRows";
import { songTitles } from "./lib/searchbar";
import PracticePage from "./practice/PracticePage";

function App() {
  // ** State Management **

  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert();

  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : prefersDarkMode
  );
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem("gameMode")
      ? localStorage.getItem("gameMode") === "hard"
      : false
  );
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.solution !== solution) return [];
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) setIsGameWon(true);
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true);
      showErrorAlert(CORRECT_SONG_MESSAGE(solution), { persist: true, delayMs: 500 });
    }
    return loaded.guesses;
  });
  const [stats, setStats] = useState(() => loadStats());
  const [skippedRows, setSkippedRows] = useState<number[]>([]);
  const [autoPlay, setAutoPlay] = useState(false);
  const extendedPlayDuration = 60;

  const currentTurn = guesses.length + 1;

  // ** Effect Hooks **

  useEffect(() => {
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => setIsInfoModalOpen(true), WELCOME_INFO_MODAL_MS);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    saveGameStateToLocalStorage({ mode: 'game', guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      const winMessage = WIN_MESSAGE(guesses.length);
      showSuccessAlert(winMessage, { delayMs: 500, persist: true });
      setTimeout(() => setIsSongModalOpen(true), 2500);
      fetch(`https://hymnle.com/game_won?guesses=${guesses.length}`, {
        method: "GET",
      });

      window.gtag("event", "game_won", {
        event_category: "Game",
        event_label: "Hymnle Win",
        value: guesses.length,
      });

      setAutoPlay(true);
    }
    if (isGameLost) {
      setTimeout(() => setIsSongModalOpen(true), 500);
    }
  }, [isGameWon, isGameLost, showSuccessAlert, guesses.length]);

  // ** Helper Functions **

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem("gameMode") === "hard") {
      setIsHardMode(isHard);
      localStorage.setItem("gameMode", isHard ? "hard" : "normal");
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE);
    }
  };

  const normalPlayDurations = new Map<number, number>([[1, 1], [2, 2], [3, 4], [4, 8], [5, 15], [6, 30], [7, 30]]);
  const hardModePlayDurations = new Map<number, number>([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 6]]);

  const getPlayDuration = (): number => {
    const playDurations = isHardMode ? hardModePlayDurations : normalPlayDurations;
    return playDurations.get(currentTurn) ?? 31; // Fallback to 31 seconds
  };

  const calculateTimeAdded = (): number => {
    const playDurations = isHardMode ? hardModePlayDurations : normalPlayDurations;
    const currentDuration = playDurations.get(currentTurn) ?? 0;
    const nextDuration = playDurations.get(currentTurn + 1) ?? 0;
    return nextDuration - currentDuration;
  };

  const timeAdded = calculateTimeAdded();

  const onSelect = (selectedHymn: string) => {
    setCurrentGuess(selectedHymn);
  };

  const onEnter = () => {
    if (!currentGuess) return showErrorAlert("No hymn selected");
    if (guesses.includes(currentGuess))
      return showErrorAlert("You've already guessed this song");

    const hymn = songTitles.find((s) => s === currentGuess);
    const winningSong = isWinningSong(currentGuess);

    if (hymn && currentTurn <= MAX_CHALLENGES && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningSong) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        setIsGameWon(true);
      } else if (currentTurn === MAX_CHALLENGES) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        setIsGameLost(true);
        showErrorAlert(CORRECT_SONG_MESSAGE(solution), { persist: true, delayMs: 500 });
      }
    } else {
      showErrorAlert(hymn ? "No more guesses left" : "Hymn title not found");
    }

    const searchBar = document.getElementById("searchBarInput") as HTMLInputElement;
    if (searchBar) searchBar.value = "";
    setCurrentGuess("");
  };

  const onSkip = () => {
    if (currentTurn > MAX_CHALLENGES) return showErrorAlert("No more guesses left");
    setSkippedRows((prev) => [...prev, currentTurn - 1]);
    setGuesses((prevGuesses) => {
      const updatedGuesses = [...prevGuesses, "SKIPPED"];
      if (updatedGuesses.length === MAX_CHALLENGES) {
        setStats(addStatsForCompletedGame(stats, updatedGuesses.length));
        setIsGameLost(true);
        showErrorAlert(CORRECT_SONG_MESSAGE(solution), { persist: true, delayMs: 500 });
      }
      return updatedGuesses;
    });
  };

  // ** Render **

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          isDarkMode={isDarkMode}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
                <GameRows guesses={guesses} skippedRows={skippedRows} isGameWon={isGameWon} isDarkMode={isDarkMode} />
                <PlayButton
                  audioUrl={solutionMp3Url}
                  isDarkMode={isDarkMode}
                  playDuration={isGameWon ? extendedPlayDuration : getPlayDuration()}
                  autoPlay={autoPlay}
                />        <div className="max-w-screen-sm w-full mx-auto flex-col">
                  <SearchBar onSelect={onSelect} isDarkMode={isDarkMode} isDisabled={isGameWon || isGameLost} />
                  <div className="flex justify-between mt-4">
                    <>
                      <SkipButton onSkip={onSkip} timeAdded={timeAdded} isDarkMode={isDarkMode} isDisabled={isGameWon || isGameLost} />
                      <SubmitButton onClick={onEnter} isDisabled={isGameWon || isGameLost} />
                    </>
                  </div>
                </div>
                <InfoModal isOpen={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} />
                <StatsModal
                  isOpen={isStatsModalOpen}
                  handleClose={() => setIsStatsModalOpen(false)}
                  guesses={guesses}
                  gameStats={stats}
                  isGameLost={isGameLost}
                  isGameWon={isGameWon}
                  handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
                  isHardMode={isHardMode}
                  isDarkMode={isDarkMode}
                  numberOfGuessesMade={guesses.length}
                />
                <SongModal
                  isOpen={isSongModalOpen}
                  handleClose={() => {
                    setIsSongModalOpen(false);
                    setIsStatsModalOpen(true);
                  }}
                  guesses={guesses}
                  isGameLost={isGameLost}
                  isGameWon={isGameWon}
                  handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
                  isHardMode={isHardMode}
                  isDarkMode={isDarkMode}
                />
                <SettingsModal
                  isOpen={isSettingsModalOpen}
                  handleClose={() => setIsSettingsModalOpen(false)}
                  isHardMode={isHardMode}
                  handleHardMode={handleHardMode}
                  isDarkMode={isDarkMode}
                  handleDarkMode={handleDarkMode}
                />
                <AlertContainer />
              </div>
            )}
          />
          <Route
            exact
            path="/practice"
            render={() => (
              <PracticePage
                isInfoModalOpen={isInfoModalOpen}
                setIsInfoModalOpen={setIsInfoModalOpen}
                isStatsModalOpen={isStatsModalOpen}
                setIsStatsModalOpen={setIsStatsModalOpen}
                isSongModalOpen={isSongModalOpen}
                setIsSongModalOpen={setIsSongModalOpen}
                isSettingsModalOpen={isSettingsModalOpen}
                setIsSettingsModalOpen={setIsSettingsModalOpen}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
