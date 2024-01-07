import { useCallback, useState } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'

export interface SwitchProps {
  /**
   * Label
   */
  label: string
  /**
   * On change
   */
  onChange?: () => void
}

export const Switch: React.FC<SwitchProps> = ({ label, onChange }) => {
  const [enabled, setEnabled] = useState(false)

  const handleOnChange = useCallback(() => {
    setEnabled((prev) => !prev)
    onChange?.()
  }, [onChange])

  return (
    <HeadlessSwitch.Group>
      <div className="flex items-center">
        <HeadlessSwitch
          checked={enabled}
          onChange={handleOnChange}
          className={`${
            enabled ? 'bg-light-accent' : 'bg-mid-gray'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </HeadlessSwitch>
        <HeadlessSwitch.Label className="ml-2 text-sm font-medium text-dark-shades">
          {label}
        </HeadlessSwitch.Label>
      </div>
    </HeadlessSwitch.Group>
  )
}
