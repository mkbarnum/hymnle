import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import { useLocation } from 'react-router-dom';

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  isDarkMode: boolean
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  isDarkMode,
}: Props) => {
  const routerLocation = useLocation();
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
  )
}