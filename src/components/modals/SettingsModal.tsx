import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import {
  HARD_MODE_DESCRIPTION,
} from '../../constants/strings'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
}: Props) => {
  const routerLocation = useLocation()
  const navigate = useNavigate()
  const isEndlessMode = routerLocation.pathname === '/practice'

  const handleEndlessMode = (enabled: boolean) => {
    handleClose()
    navigate(enabled ? '/practice' : '/')
  }

  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col mt-2 divide-y">
        <SettingsToggle
          settingName="Endless Mode"
          flag={isEndlessMode}
          handleFlag={handleEndlessMode}
          description="Play unlimited random songs"
        />
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
      </div>
    </BaseModal>
  )
}
