import { useHistory, useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { GAME_TITLE } from '../../constants/strings';

type Props = {
  setIsInfoModalOpen: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
  setIsSettingsModalOpen: (value: boolean) => void;
  isDarkMode: boolean;
};

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  isDarkMode,
}: Props) => {
  const history = useHistory();
  const routerLocation = useLocation(); // Renamed location to routerLocation to avoid conflict

  const handlePracticeClick = () => {
    if (routerLocation.pathname === '/practice') {
      // If already in practice mode, switch to game mode
      history.push('/'); // Or any other path for game mode
    } else {
      // Otherwise, navigate to practice mode
      history.push('/practice');
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-content px-5 flex items-center justify-between">
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <div className="flex items-center">
          <img
            src={isDarkMode ? '../../logo-dark-mode.png' : '../../logo.png'}
            alt="Logo"
            className="h-10 w-10 mr-2"
          />
          <p className="text-xl font-bold dark:text-white">
            {routerLocation.pathname === '/practice' ? (
              <>
                {GAME_TITLE}
                <span className="text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-1 ml-2">Practice</span>
              </>
            ) : (
              GAME_TITLE
            )}
          </p>
        </div>
        <div className="flex items-center">
          <button
            className="px-3 py-0 text-med leading-6 font-medium text-gray-900 hover:bg-white dark:text-gray-100 dark:hover:text-gray-700 border border-white rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-white mr-2"
            onClick={handlePracticeClick}
          >
            {routerLocation.pathname === '/practice' ? 'Game Mode' : 'Practice Mode'}
          </button>
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};
