import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'
import { Button } from '../..'

type Option = {
  /**
   * Tab label
   */
  label: React.ReactNode
  /**
   * Tab content
   */
  content: React.ReactNode
}

export interface TabsProps {
  /**
   * Tab options
   */
  options: [Option, Option, ...Option[]]
  /**
   * Full width?
   */
  fullWidth?: boolean
}

export const Tabs: React.FC<TabsProps> = ({ options, fullWidth = true }) => {
  return (
    <Tab.Group>
      <Tab.List
        className={classNames(
          'border-b-mid-gray flex items-center border-b',
          fullWidth ? 'w-full' : 'w-max',
        )}
      >
        {options.map(({ label }) => (
          <Tab key={String(label)} as={Fragment}>
            {({ selected }) => (
              <Button
                className={classNames(
                  'outline-none text-xs font-medium',
                  selected
                    ? 'text-light-accent border-b-2 border-b-light-accents'
                    : 'text-gray',
                  { 'w-full': fullWidth },
                )}
              >
                <div className="hover:bg-light-accent-halo size-full rounded-md p-1">
                  {label}
                </div>
              </Button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {options.map(({ label, content }) => (
          <Tab.Panel key={String(label)}>{content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
